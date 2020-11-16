from os import walk, listdir

target_dir = './trajectories/'

users = [x for x in listdir(target_dir)]
file_names = []
columns = 'user,trajectory,lat,lon,date,time\n'
new_lines = [columns]
for user in users[:3]:

    for trajectory_file_name in listdir(target_dir + user + '/Trajectory/'):
        trajectory_file_path = target_dir + user + '/Trajectory/' + trajectory_file_name
        with open(trajectory_file_path) as f:

            [f.readline() for _ in range(6)]
            # new_lines = [columns]
            for line in f.readlines():
                split_line = line.split(',') 
                columns_to_keep = [0, 1, 5, 6]
                point_on_trajectory = list(map(lambda  i: split_line[i], columns_to_keep))

                new_line = ','.join([user, trajectory_file_name.split('.')[0]] + point_on_trajectory)
                new_lines.append(new_line)

new_file = ''.join(new_lines)
with open('all_trajectory_data.csv', 'w') as new_f: 
    new_f.write(new_file)
    new_f.close()
    # file_names.append(user + '_' + trajectory_file_name)
# with open('./trajectory_names.txt', 'w') as f:
#     f.write(','.join(file_names))
#     f.close()


            
