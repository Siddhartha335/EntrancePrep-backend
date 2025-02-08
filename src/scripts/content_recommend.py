import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics.pairwise import cosine_similarity
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

load_dotenv()

# Step 1: Setup database connection using SQLAlchemy
DATABASE_URL = os.getenv("DATABASE_URL_PYTHON")

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# Step 2: Query the questions table using SQLAlchemy and load it into a pandas DataFrame
query = """
    SELECT "question_id", "question_text", "category_id", "difficulty_level"
    FROM "questions"
"""

# Load the data into a pandas DataFrame
questions_df = pd.read_sql(query, engine)

# Step 3: Handle missing values (for example, filling null difficulty with 'Unknown' or similar)
questions_df['difficulty_level'] = questions_df['difficulty_level'].fillna('Unknown')

# Step 4: Vectorize the 'question_text' column using TF-IDF
tfidf_vectorizer = TfidfVectorizer(stop_words='english')
question_text_features = tfidf_vectorizer.fit_transform(questions_df['question_text'])

# Step 5: Encode the categorical columns like 'category_id' and 'difficulty_level'
label_encoder = LabelEncoder()

# Ensure both columns are encoded
questions_df['category_id_encoded'] = label_encoder.fit_transform(questions_df['category_id'])
questions_df['difficulty_level_encoded'] = label_encoder.fit_transform(questions_df['difficulty_level'])

# Step 6: Combine the TF-IDF features with the encoded categorical features
# Convert encoded columns to a DataFrame
encoded_features = questions_df[['category_id_encoded', 'difficulty_level_encoded']].values

# Concatenate text-based features with the encoded features
combined_features = np.hstack([question_text_features.toarray(), encoded_features])

# Step 7: Calculate cosine similarity between questions based on the combined features
content_similarity = cosine_similarity(combined_features)

# Step 8: Convert the similarity matrix into a DataFrame for easier readability
content_similarity_df = pd.DataFrame(content_similarity, index=questions_df['question_id'], columns=questions_df['question_id'])

# Function to recommend similar questions based on content similarity
def recommend_similar_questions(question_id, top_n=5):
    # Get the similarity scores for the given question
    similar_questions = content_similarity_df.loc[question_id].sort_values(ascending=False)[1:].index.tolist()  # Exclude itself
    return similar_questions[:top_n]

# Example usage
recommended_questions = recommend_similar_questions(question_id=5, top_n=5)  # Assuming question_id = 5
print("Recommended Questions (Content-Based Filtering):", recommended_questions)
