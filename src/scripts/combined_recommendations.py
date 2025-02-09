import pandas as pd
import numpy as np
from sklearn.decomposition import TruncatedSVD
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics.pairwise import cosine_similarity
from sqlalchemy import create_engine
import os
import sys
from dotenv import load_dotenv

load_dotenv()

# Step 1: Setup database connection using SQLAlchemy
DATABASE_URL = os.getenv("DATABASE_URL_PYTHON")
engine = create_engine(DATABASE_URL)

# Step 2: Fetch user answers data
user_answers_query = """
    SELECT "user_id", "question_id", "is_correct"
    FROM "user_answers"
"""
user_answers_df = pd.read_sql(user_answers_query, engine)
user_answers_df = user_answers_df.drop_duplicates(subset=['user_id', 'question_id'])

# Step 3: Create user-item matrix for collaborative filtering
user_item_matrix = user_answers_df.pivot(index='user_id', columns='question_id', values='is_correct').fillna(0)

# Apply SVD (Collaborative Filtering)
svd = TruncatedSVD(n_components=100, random_state=42)
user_item_matrix_svd = svd.fit_transform(user_item_matrix)
user_item_matrix_svd_df = pd.DataFrame(user_item_matrix_svd, index=user_item_matrix.index)

# Compute user similarity matrix
user_similarity_matrix = np.dot(user_item_matrix_svd_df, user_item_matrix_svd_df.T)
user_similarity_df = pd.DataFrame(user_similarity_matrix, index=user_item_matrix.index, columns=user_item_matrix.index)

# Step 4: Fetch questions data
questions_query = """
    SELECT "question_id", "question_text", "category_id", "difficulty_level"
    FROM "questions"
"""
questions_df = pd.read_sql(questions_query, engine)
questions_df['difficulty_level'] = questions_df['difficulty_level'].fillna('Unknown')

# Step 5: Content-Based Filtering (TF-IDF + Cosine Similarity)
tfidf_vectorizer = TfidfVectorizer(stop_words='english')
question_text_features = tfidf_vectorizer.fit_transform(questions_df['question_text'])

# Encode categorical features (category_id, difficulty_level)
label_encoder = LabelEncoder()
questions_df['category_id_encoded'] = label_encoder.fit_transform(questions_df['category_id'])
questions_df['difficulty_level_encoded'] = label_encoder.fit_transform(questions_df['difficulty_level'])

# Combine features
encoded_features = questions_df[['category_id_encoded', 'difficulty_level_encoded']].values
combined_features = np.hstack([question_text_features.toarray(), encoded_features])

# Compute cosine similarity between questions
content_similarity = cosine_similarity(combined_features)
content_similarity_df = pd.DataFrame(content_similarity, index=questions_df['question_id'], columns=questions_df['question_id'])

# Step 6: Collaborative Filtering Recommendation
def recommend_questions_collaborative(user_id, top_n=5):
    if user_id not in user_similarity_df.index:
        return []
    
    similar_users = user_similarity_df[user_id].sort_values(ascending=False)[1:].index.tolist()
    similar_users_answers = user_answers_df[user_answers_df['user_id'].isin(similar_users)]
    
    # Get most frequently answered questions from similar users
    question_recommendations = similar_users_answers['question_id'].value_counts().head(top_n).index.tolist()
    return question_recommendations

# Step 7: Content-Based Recommendation
def recommend_questions_content_based(question_id, top_n=5):
    if question_id not in content_similarity_df.index:
        return []
    
    similar_questions = content_similarity_df.loc[question_id].sort_values(ascending=False)[1:].index.tolist()
    return similar_questions[:top_n]

# Step 8: Hybrid Recommendation (User-Based + Content-Based)
def recommend_questions_for_user(user_id, top_n=5, collaborative_weight=0.7, content_weight=0.3):
    """
    Recommend questions for a user based on a hybrid approach.
    
    Args:
        user_id (str): The user ID for whom recommendations are generated.
        top_n (int): Number of recommended questions.
        collaborative_weight (float): Weight for collaborative filtering.
        content_weight (float): Weight for content-based filtering.
    
    Returns:
        list: Top recommended question IDs.
    """
    if user_id not in user_similarity_df.index:
        print(f"User ID {user_id} not found in user data.")
        return []
    
    # Step 1: Get collaborative filtering recommendations
    collaborative_recommendations = recommend_questions_collaborative(user_id, top_n * 2)

    # Step 2: Extract the user's incorrect answers
    user_mistakes = user_answers_df[(user_answers_df['user_id'] == user_id) & (user_answers_df['is_correct'] == 0)]
    user_mistake_questions = user_mistakes['question_id'].tolist()

    # Step 3: Find similar questions based on past mistakes (Content-Based)
    content_based_recommendations = []
    for qid in user_mistake_questions:
        similar_questions = recommend_questions_content_based(qid, top_n=2)
        content_based_recommendations.extend(similar_questions)

    # Step 4: Merge recommendations with weighted scoring
    combined_recommendations = {}

    # Assign collaborative filtering scores
    for i, qid in enumerate(collaborative_recommendations):
        combined_recommendations[qid] = combined_recommendations.get(qid, 0) + collaborative_weight * (1 / (i + 1))

    # Assign content-based filtering scores
    for i, qid in enumerate(content_based_recommendations):
        combined_recommendations[qid] = combined_recommendations.get(qid, 0) + content_weight * (1 / (i + 1))

    # Sort recommendations by score
    sorted_recommendations = sorted(combined_recommendations.items(), key=lambda x: x[1], reverse=True)

    # Return the top N recommended questions
    return [qid for qid, score in sorted_recommendations[:top_n]]

# Step 9: Accept user_id as command line argument and print recommendations
if __name__ == "__main__":
    user_id = sys.argv[1]  # Get user_id from command-line argument
    recommended_questions = recommend_questions_for_user(user_id, top_n=15)
    print("Recommended Questions:", recommended_questions)

