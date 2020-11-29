@Hasan Pourmahmoodaghababa

@Note that you will need to download the dataset 
https://drive.google.com/file/d/1qKLmQyXX4s-mEJyF8LGXYEqqE1RaWXwk/view?usp=sharing 
in order to it works.

Firstly, I have created appropriate data and data structure (linked list) for route extraction task which is efficient in terms of run time. Then I created a class that has a predictTraj() function that receives a trajectory gamma (in an array form) and gives the address of closest trajectories among ~18000 trajectories to gamma up to a certain threshold (which I have set to 1). 

Also, I have connected the feature mapping to the class, i.e., by calling this class, feature map will be called automatically. 

There was a bug in the first version of feature map (which is already on repo) and I found it and fixed it. 

Now by creating a "var comp = new Computation(maindata, centers, predata)" class and using "comp.predictTraj"  and Unproject() function you will get the alt address of closest trajectories.
