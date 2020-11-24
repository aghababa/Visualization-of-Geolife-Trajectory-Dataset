import pandas as pd

data = pd.read_csv('final_data_with_indices.csv')
trad_data = pd.read_csv('all_trajectory_data.csv')

visualized_users = trad_data.user.unique()
visualized_points = data[data['User Name'].isin(visualized_users)]
visualized_points.to_csv('temporary_point_data.csv')
