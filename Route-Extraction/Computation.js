class Node{
	constructor(element) 
    { 
        this.element = element; 
        this.next = null;
    } 
}
class LinkedList{
	constructor() 
    { 
        this.head = null; 
        this.size = 0; 
    } 
    add(element) 
    { 
	    var node = new Node(element); 
	    var current; 
	    if (this.head == null) 
	        this.head = node; 
	    else { 
	        current = this.head; 
	        while (current.next) { 
	            current = current.next; 
	        } 
	        current.next = node; 
	    } 
	    this.size++; 
	} 
	isEmpty() 
	{ 
	    return this.size == 0; 
	} 
}
class Computation {
	constructor(maindata,centers,predata){
		this.convertion=new FeatureMap()
		this.maindata=maindata
		this.centers=[]
		for (let i=0;i<100;i++){
			this.centers.push([giveId(centers[i]),giveVect(centers[i])])
		}
		this.centers_ll=[]
		for (let i=0;i<100;i++){
		 	var ll=new LinkedList()
		 	ll.add(this.centers[i])
			this.centers_ll.push(ll)
		}
		for (let i=0;i<this.maindata.length;i++){
			this.centers_ll[+this.maindata[i]['k:100']].add([giveId(predata[i]),giveVect(predata[i])])	
		}
		function giveId(each){
			return each.User_Name+'_'+each.Trajectory
		}
		function giveVect(each){
			return [+each.x_1,+each.x_2,+each.x_3,+each.x_4,+each.x_5,+each.x_6,+each.x_7,+each.x_8
					,+each.x_9,+each.x_10,+each.x_11,+each.x_12,+each.x_13,+each.x_14,+each.x_15,+each.x_16,+each.x_17
					,+each.x_18,+each.x_19,+each.x_20]
		}
	}
	
	predictTraj(entered){
		let Q = [[39.6,114.8],[40,116.34], [39, 114], [40,115], [41,116], [39.5,113.5],[40.5, 115.5], [40.3, 114.4], [38.5, 113.5], [39.3,117], [39.5,115],[39.4, 116], [39,114.6], [40.5, 115.5], [41.2,115], [42, 116], [41.7, 114.8],[38,115], [37, 116], [37.5, 114]]

		let enteredVector=this.convertion.main(Q,entered, 0.3)
		console.log(enteredVector)
		let index=this.selectOneOfCenters(enteredVector)
		return this.selectSomeOfTrajectoriesInUpIndex(index,enteredVector)
	}
	selectOneOfCenters(enteredVector){
		let min=1000
		let minindex=0
		for(let i=0;i<100;i++){
			let center=this.centers_ll[i].head.element[1]
			let dis=this.distance(center,enteredVector)
			if(dis<min){
				min=dis
				minindex=i
			}
		}
		return minindex
	}
	selectSomeOfTrajectoriesInUpIndex(index,enteredVector){
		let CenterRow=this.centers_ll[index].head
		let trajaddress=[]
		while (CenterRow){
			let dis=this.distance(enteredVector,CenterRow.element[1])
			if(dis<1){
				trajaddress.push(CenterRow.element[0])
				CenterRow=CenterRow.next
			}else{
				CenterRow=CenterRow.next
			}
		}
		return trajaddress
	}
	distance(vec_1,vec_2){
	  let sum = 0;
	  for (let i=0; i<20; i++){
	   sum = sum + Math.pow(vec_1[i]-vec_2[i], 2);
	  }
	  return Math.sqrt(sum)
	}

}