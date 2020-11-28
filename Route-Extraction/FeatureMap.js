/* The following class gets an array of points Q as landmark points, an array of points as a curve, and a positive number as sigma*/
/* Its output is a vector of dimension size(Q)*/
/* To use it, please see the example in index.js */

class FeatureMap {

      distPointUnclosed(q,gamma,sigma){
      
            function dist(arr1,arr2){
                  return Math.sqrt(Math.pow((arr1[0]-arr2[0]),2) + Math.pow((arr1[1]-arr2[1]),2));
            }
      
            var gammaCopy=[...gamma]
            var gammaCopy1=[...gamma]
            var p1=gamma.splice(0,gamma.length-1);
            gamma=gammaCopy
            var p2=gamma.splice(1,gamma.length);
            var L=p1.map(d=>{return dist(d,p2[p1.indexOf(d)])+Math.pow(10,-5)})
            var w=p1.map(d=>{
                  let pair=[d[0]-p2[p1.indexOf(d)][0],d[1]-p2[p1.indexOf(d)][1]]
                  let norm=dist(pair,[0,0])+Math.pow(10,-5)
                  pair=[(pair[1]/norm),-1*(pair[0]/norm)]
                  return pair
            })
    
    
            var distSigned=p1.map(d=>{return -1*(d[0]-q[0])*w[p1.indexOf(d)][0]+(-1*(d[1]-q[1])*w[p1.indexOf(d)][1])})
    
    
            var absDistSigned=distSigned.map(d=>{return Math.abs(d)})
    
            
            var argMinPoints=p1.map(d=>{
                  let p_1=d
                  let p_2=p2[p1.indexOf(d)]
                  let L_=L[p1.indexOf(d)]
           
                  let q_p1=[q[0]-p_1[0],q[1]-p_1[1]]
                  let p2_p1=[p_2[0]-p_1[0],p_2[1]-p_1[1]]
                  let coef=(q_p1[0]*p2_p1[0]+q_p1[1]*p2_p1[1])/Math.pow(L_,2)
                  return [p_1[0]+coef*p2_p1[0],p_1[1]+coef*p2_p1[1]]
            })
      
    
            var startDist=p1.map(d=>{ //G
                  return dist(d,argMinPoints[p1.indexOf(d)]) 
            })
            var endDist=p2.map(d=>{ //H
                  return dist(d,argMinPoints[p2.indexOf(d)])
            });
    
            
            var distToStartPoint=p1.map(d=>{return dist(d,q)}) //d1
            var distToEndPoint=p2.map(d=>{return dist(d,q)}) //d2
        
            
            // d
            var distToEndPoints=distToStartPoint.map(d=>{return Math.min(d,distToEndPoint[distToStartPoint.indexOf(d)])});
     
            
            var distSegment=startDist.map(d=>{
                  if(Math.abs(d+endDist[startDist.indexOf(d)]-L[startDist.indexOf(d)])<Math.pow(10,-5)){return distSigned[startDist.indexOf(d)]} else { return distToEndPoints[startDist.indexOf(d)]};
            });
         
            var J2 = []
            startDist.map(d=>{
                  if(Math.abs(d+endDist[startDist.indexOf(d)]-L[startDist.indexOf(d)])>Math.pow(10,-5)){J2.push(startDist.indexOf(d))}
            });
      
    
            var distSegmentCopy =[...distSegment];            
            var distSegmentCopyAbs = distSegmentCopy.map(d => Math.abs(d)); //dist
    
    
            var distFromStart1 = dist(q, p1[0]);
            var ds = (q[0]-p1[0][0])*w[0][0] + (q[1]-p1[0][1])*w[0][1];
            var distFromStart = ds * Math.max(Math.abs(ds), Math.sqrt(Math.pow(distFromStart1,2) - Math.pow(ds,2) + Math.pow(10,-5)))/(distFromStart1 +  Math.pow(10,-5));
    
    
            var distFromEnd1 = dist(q, p2[p2.length-1]);
            var de = (q[0]-p2[p2.length-1][0])*w[w.length-1][0] + (q[1]-p2[p2.length-1][1])*w[w.length-1][1];
            var distFromEnd = de * Math.max(Math.abs(de), Math.sqrt(Math.pow(distFromEnd1,2) - Math.pow(de,2) + Math.pow(10,-5)))/(distFromEnd1 +  Math.pow(10,-5));
    
    
           
            if (Math.abs(distSegmentCopyAbs[0]-distFromStart1)<Math.pow(10,-5)) {distSegment[0] = distFromStart}
            if (Math.abs(distSegmentCopyAbs[distSegmentCopyAbs.length-1]-distFromEnd1)<Math.pow(10,-5)) {distSegment[distSegment.length-1] = distFromEnd}
    
            var argMin = arr => arr.indexOf(Math.min(...arr));
            var j = argMin(distSegmentCopyAbs);
            
            gamma = gammaCopy1
            var sign = 1;
            if (J2.includes(j)){
                  if (j == 0 && dist(q,gamma[0]) < dist(q,gamma[1])){sign = 1}
                  else if (j == gamma.length-2 && dist(q,gamma[j+1])<dist(q,gamma[j])){sign =1}
                  else if (dist(q,gamma[j])<dist(q,gamma[j+1])){
                        let qq = [2 * gamma[j][0] - (gamma[j-1][0] + gamma[j+1][0])/2, 2 * gamma[j][1] - (gamma[j-1][1] + gamma[j+1][1])/2];
                        sign = Math.sign((qq[0]-gamma[j][0])*(w[j-1][0]+w[j][0]) + (qq[1]-gamma[j][1])*(w[j-1][1]+w[j][1]));
                  }
                  else if (dist(q,gamma[j+1]) <= dist(q,gamma[j])){
                        let qqq = [2 * gamma[j+1][0] - (gamma[j][0] + gamma[j+2][0])/2, 2 * gamma[j+1][1] - (gamma[j][1] + gamma[j+2][1])/2];
                        sign = Math.sign((qqq[0]-gamma[j+1][0])*(w[j][0]+w[j+1][0]) + (qqq[1]-gamma[j+1][1])*(w[j][1]+w[j+1][1]));
                  }
            }
    
            let E = distSegment[j];
            let F = distSegmentCopy[j];
            let distWeighted = sign * (E/sigma) * Math.exp(-Math.pow(F/sigma,2));
            return(distWeighted);
      }
    
      //***************************************************************************//
    
      distPointClosed(q,gamma,sigma){
    
        function dist(arr1,arr2){
          return Math.sqrt(Math.pow((arr1[0]-arr2[0]),2) + Math.pow((arr1[1]-arr2[1]),2));
          }
    
        var gammaCopy=[...gamma]
        var gammaCopy1=[...gamma]
        var p1=gamma.splice(0,gamma.length-1);
        gamma=gammaCopy
        var p2=gamma.splice(1,gamma.length);
        var L=p1.map(d=>{return dist(d,p2[p1.indexOf(d)])+Math.pow(10,-5)})
        var w=p1.map(d=>{
              let pair=[d[0]-p2[p1.indexOf(d)][0],d[1]-p2[p1.indexOf(d)][1]]
              let norm=dist(pair,[0,0])+Math.pow(10,-5)
              pair=[(pair[1]/norm),-1*(pair[0]/norm)]
              return pair
        })
    
        var distSigned=p1.map(d=>{return -1*(d[0]-q[0])*w[p1.indexOf(d)][0]+(-1*(d[1]-q[1])*w[p1.indexOf(d)][1])})
    
        var absDistSigned=distSigned.map(d=>{return Math.abs(d)})
    
        var argMinPoints=p1.map(d=>{
          let p_1=d
          let p_2=p2[p1.indexOf(d)]
          let L_=L[p1.indexOf(d)]
    
          let q_p1=[q[0]-p_1[0],q[1]-p_1[1]]
          let p2_p1=[p_2[0]-p_1[0],p_2[1]-p_1[1]]
          let coef=(q_p1[0]*p2_p1[0]+q_p1[1]*p2_p1[1])/Math.pow(L_,2)
          return [p_1[0]+coef*p2_p1[0],p_1[1]+coef*p2_p1[1]]
        })
    
        var startDist=p1.map(d=>{ //G
          return dist(d,argMinPoints[p1.indexOf(d)]) 
        })
        var endDist=p2.map(d=>{ //H
          return dist(d,argMinPoints[p2.indexOf(d)])
        });
    
        var distToStartPoint=p1.map(d=>{return dist(d,q)}) //d1
        var distToEndPoint=p2.map(d=>{return dist(d,q)}) //d2
    
        // d
        var distToEndPoints=distToStartPoint.map(d=>{return Math.min(d,distToEndPoint[distToStartPoint.indexOf(d)])});
    
        var distSegment=startDist.map(d=>{
          if(Math.abs(d+endDist[startDist.indexOf(d)]-L[startDist.indexOf(d)])<Math.pow(10,-5)){return distSigned[startDist.indexOf(d)]
          } else { 
            return distToEndPoints[startDist.indexOf(d)]};
        });
    
        var J2 = []
        startDist.map(d=>{
          if(Math.abs(d+endDist[startDist.indexOf(d)]-L[startDist.indexOf(d)])>Math.pow(10,-5)){J2.push(startDist.indexOf(d))}
        });
        
        var distSegmentCopy =[...distSegment];            
        var distSegmentCopyAbs = distSegmentCopy.map(d => Math.abs(d)); //dist
    
        var argMin = arr => arr.indexOf(Math.min(...arr));
        var j = argMin(distSegmentCopyAbs);    
        
        gamma = gammaCopy1
        var sign = 1;
        if (J2.includes(j)){
          if (j == 0 && dist(q,gamma[0]) < dist(q,gamma[1])){
            var y = dist(gamma[0],gamma[1]) - dist(gamma[gamma.length-1],gamma[gamma.length-2]);
            if (y < 0){
              var x = [0,0];
                x[0] = gamma[0][0] + 0.1 * dist(gamma[0], gamma[1])* (gamma[gamma.length-2][0]- gamma[gamma.length-1][0])/dist(gamma[gamma.length-2], gamma[gamma.length-1]);
                x[1] = gamma[0][1] + 0.1 * dist(gamma[0], gamma[1])* (gamma[gamma.length-2][1]- gamma[gamma.length-1][1])/dist(gamma[gamma.length-2], gamma[gamma.length-1]);
    
              var z = [0,0];
                z[0] = gamma[0][0] + 0.1 * dist(gamma[0],gamma[1])*(gamma[1][0]-gamma[0][0])/dist(gamma[1],gamma[0]);
                z[1] = gamma[0][1] + 0.1 * dist(gamma[0],gamma[1])*(gamma[1][1]-gamma[0][1])/dist(gamma[1],gamma[0]);
    
              var q1 = [2 * gamma[0][0] - (x[0] + z[0])/2, 2 * gamma[0][1] - (x[1] + z[1])/2];
            } 
            else{
              var x = [0,0]; 
                x[0] = gamma[0][0] + 0.1 * dist(gamma[-1],gamma[-2])*(gamma[1][0]-gamma[0][0]);
                x[1] = gamma[0][1] + 0.1 * dist(gamma[-1],gamma[-2])*(gamma[1][1]-gamma[0][1]);
    
              var z = [0,0];
                z[0] = gamma[0][0] + 0.1 * dist(gamma[-1],gamma[-2])*(gamma[-2][0]-gamma[-1][0]);
                z[1] = gamma[0][1] + 0.1 * dist(gamma[-1],gamma[-2])*(gamma[-2][1]-gamma[-1][1]);
    
              var q1 = [2 * gamma[0][0] - (x[0] + z[0])/2, 2 * gamma[0][1] - (x[1] + z[1])];
            }
            var s = (q1[0]-gamma[gamma.length-1][0]) * (w[w.length-1][0] + w[0][0]) + (q1[1]-gamma[gamma.length-1][1]) * (w[w.length-1][1] + w[0][1]);
            sign = Math.sign(s); 
          }
          else if (j == gamma.length-2 && dist(q,gamma[j+1])<dist(q,gamma[j])){
            let s1 = w[-1][0]*((q[0] - gamma[gamma.length-1][0])/ (dist(q, gamma[gamma.length-1]) + Math.pow(10,-5)));
            let s2 = w[-1][1]*((q[1] - gamma[gamma.length-1][1])/ (dist(q, gamma[gamma.length-1]) + Math.pow(10,-5)));                
            sign = Math.sign(s1 + s2);
          }
          else if (dist(q,gamma[j])<dist(q,gamma[j+1])){
            let qq = [2 * gamma[j][0] - (gamma[j-1][0] + gamma[j+1][0])/2, 2 * gamma[j][1] - (gamma[j-1][1] + gamma[j+1][1])/2];
            sign = Math.sign((qq[0]-gamma[j][0])*(w[j-1][0]+w[j][0]) + (qq[1]-gamma[j][1])*(w[j-1][1]+w[j][1]));
            console.log("sign3 =", sign)
          }
          else if (dist(q,gamma[j+1]) <= dist(q,gamma[j])){
            let qqq = [2 * gamma[j+1][0] - (gamma[j][0] + gamma[j+2][0])/2, 2 * gamma[j+1][1] - (gamma[j][1] + gamma[j+2][1])/2];
            sign = Math.sign((qqq[0]-gamma[j+1][0])*(w[j][0]+w[j+1][0]) + (qqq[1]-gamma[j+1][1])*(w[j][1]+w[j+1][1]));
          }
        }
        let E = distSegment[j];
        let F = distSegmentCopy[j];
        let distWeighted = sign * (E/sigma) * Math.exp(-Math.pow(F/sigma,2));
        return(distWeighted);
      }
    
        //***************************************************************************//
      
      main(Q,gamma,sigma){
                let out=[]
                let letgamma=[]
                if(gamma[0][0]===gamma[gamma.length-1][0] && gamma[0][1]===gamma[gamma.length-1][1]){
                      for (let i =0 ;i<Q.length;i++){
                      letgamma=[...gamma]
                      out.push(this.distPointClosed(Q[i],gamma,sigma))
                      gamma=letgamma
                      }
                } else {
                      for (let i =0 ;i<Q.length;i++){
                      letgamma=[...gamma]
                      out.push(this.distPointUnclosed(Q[i],gamma,sigma))
                      gamma=letgamma
                      }
                }
                
            return out
          }
    }