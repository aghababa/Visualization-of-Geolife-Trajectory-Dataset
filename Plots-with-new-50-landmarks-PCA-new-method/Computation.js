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
		console.log(maindata)
		console.log(centers)
		console.log(predata)
		this.centers=[]
		for (let i=0;i<1000;i++){
			this.centers.push([giveId(centers[i]),giveVect(centers[i])])
		}
		console.log(predata)
		this.centers_ll=[]
		for (let i=0;i<1000;i++){
		 	var ll=new LinkedList()
		 	ll.add(this.centers[i])
			this.centers_ll.push(ll)
		}
		for (let i=0;i<this.maindata.length;i++){
			this.centers_ll[+this.maindata[i]['k:1000']].add([giveId(predata[i]),giveVect(predata[i])])	
		}
		function giveId(each){
		
			return each.User_Name+'_'+each.Trajectory
		}
		function giveVect(each){
			return [+each.x_1,+each.x_2,+each.x_3,+each.x_4,+each.x_5,+each.x_6,+each.x_7,+each.x_8
					,+each.x_9,+each.x_10,+each.x_11,+each.x_12,+each.x_13,+each.x_14,+each.x_15,+each.x_16,
					+each.x_17,+each.x_18,+each.x_19,+each.x_20,+each.x_21,+each.x_22,+each.x_23,+each.x_24,
					+each.x_25,+each.x_26,+each.x_27,+each.x_28,+each.x_29,+each.x_30,+each.x_31,+each.x_32,
					+each.x_33,+each.x_34,+each.x_35,+each.x_36,+each.x_37,+each.x_38,+each.x_39,+each.x_40,
					+each.x_14,+each.x_42,+each.x_43,+each.x_44,+each.x_45,+each.x_46,+each.x_47,+each.x_48,
					+each.x_49,+each.x_50]
		}

	}

	

	predictTraj(entered){

        let Q = [[40.02784036172628, 116.50178611278535],
[40.085652349925475, 116.39329612255098],
[40.08039874140986, 116.24772727489473],
[40.05202225054736, 116.19966208934785],
[39.97418906423696, 116.1694496870041],
[39.899427860534345, 116.16807639598848],
[39.831967504781055, 116.2518471479416],
[39.82880367321281, 116.3617104291916],
[39.87097611205365, 116.4935463666916],
[39.95419054874236, 116.43724143505098],
[40.00575375653265, 116.37956321239473],
[40.024685570075626, 116.31501853466034],
[39.9699793365808, 116.2738198041916],
[39.90996254870152, 116.2793129682541],
[39.91733586660022, 116.3617104291916],
[39.967874375523536, 116.34385764598848],
[39.71269591644774, 116.47981345653535],
[39.66091215703148, 116.37407004833223],
[39.6989611532183, 116.2573403120041],
[39.74226919672803, 116.06095969676973],
[39.90996254870152, 116.01426780223848],
[40.129766654747705, 116.07743918895723],
[40.21895804658573, 116.0760658979416],
[40.257745909206854, 116.25596702098848],
[40.31640959147105, 116.10215842723846],
[40.20008024183078, 116.58418357372285],
[40.07724638171063, 116.79155051708223],
[39.897320728525514, 116.76133811473848],
[40.095087305350994, 116.98068380355835],
[39.93416561718383, 117.04934835433961],
[39.60272060950412, 117.02874898910524],
[39.537087506313945, 116.85022115707399],
[39.32177827012156, 116.49766623973848],
[39.35045657030925, 116.33699119091035],
[39.45338894346977, 116.05271995067598],
[40.030995007481806, 116.04585349559785],
[40.28917921376592, 116.4660805463791],
[40.41685741933303, 115.90852439403535],
[39.41933055574406, 116.00316211581233],
[39.4341814883212, 115.56096240878108],
[38.994696721865594, 115.50629228353503],
[39.1578093485124, 115.17120927572252],
[38.91460188981307, 115.06134599447253],
[39.96682187068797, 115.84260642528535],
[40.444612929944775, 116.78323835134509],
[39.037848825595745, 117.04134196043016],
[39.18809007444354, 117.30501383543016],
[39.65284221780906, 116.5751498937607],
[39.80176509832639, 115.9763950109482],
[39.70176509836639, 116.9763900109482]]

		let enteredVector=this.convertion.main(Q,entered,0.2)
		let index=this.selectOneOfCenters(enteredVector)
		//return this.selectSomeOfTrajectoriesInUpIndex(index,enteredVector)
		return this.selectIndexGroup(index)
	}
	selectIndexGroup(index){
		let group=this.centers_ll[index].head
		let gelement=group.next
		let trajaddress=[]
		while (gelement) {
			trajaddress.push(gelement.element[0])
			gelement=gelement.next
		}
		console.log(trajaddress)
		return trajaddress
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
			if(dis<0.05){
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
	  for (let i=0; i<50; i++){
	   sum = sum + Math.pow(vec_1[i]-vec_2[i], 2);
	  }
	  return Math.sqrt(sum)/50
	}

}