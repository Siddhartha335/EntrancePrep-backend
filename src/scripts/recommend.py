import pandas as pd
import numpy as np
from sklearn.decomposition import TruncatedSVD  # SVD from sklearn
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

load_dotenv()

# Step 1: Setup database connection using SQLAlchemy
DATABASE_URL = os.getenv("DATABASE_URL_PYTHON")

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# Step 2: Query the user_answers table using pandas
query = """
    SELECT "user_id", "question_id", "is_correct"
    FROM "user_answers"
"""

# Load the data into a pandas DataFrame
user_answers_df = pd.read_sql(query, engine)

# Step 3: Drop duplicate entries (if a user answered the same question multiple times, we'll keep the most recent)
user_answers_df = user_answers_df.drop_duplicates(subset=['user_id', 'question_id'])

# Step 4: Pivot the data to create a user-item matrix (rows = users, columns = questions)
user_item_matrix = user_answers_df.pivot(index='user_id', columns='question_id', values='is_correct').fillna(0)

# Step 5: Apply SVD (Matrix Factorization) to the user-item matrix
svd = TruncatedSVD(n_components=50, random_state=42)  # You can change n_components to suit your needs
user_item_matrix_svd = svd.fit_transform(user_item_matrix)

# Step 6: Convert the SVD results back to DataFrame (the reduced dimensionality matrix)
user_item_matrix_svd_df = pd.DataFrame(user_item_matrix_svd, index=user_item_matrix.index)

# Step 7: Calculate the dot product between the original user-item matrix and the reduced matrix (to predict missing values)
user_similarity_matrix = np.dot(user_item_matrix_svd_df, user_item_matrix_svd_df.T)

# Step 8: Convert it into a DataFrame for easy interpretation
user_similarity_df = pd.DataFrame(user_similarity_matrix, index=user_item_matrix.index, columns=user_item_matrix.index)

# Step 9: Function to recommend questions for a given user based on collaborative filtering (SVD)
def recommend_questions(user_id, top_n=5):
    # Get similar users for the given user
    similar_users = user_similarity_df[user_id].sort_values(ascending=False)[1:].index.tolist()  # Exclude the user itself

    # Get the questions these similar users answered correctly
    similar_users_answers = user_answers_df[user_answers_df['user_id'].isin(similar_users)]
    
    # Get the most frequently answered questions by similar users
    question_recommendations = similar_users_answers['question_id'].value_counts().head(top_n).index.tolist()

    return question_recommendations

# Example usage
recommended_questions = recommend_questions(user_id="40e8f7c2-a313-46ec-8da4-355fc5849243", top_n=50)
print("Recommended Questions (Collaborative Filtering using SVD):", recommended_questions)
