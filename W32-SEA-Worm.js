function stage1(e){if(e.data.done===true){qrtrze+=deltae[postDir];qrtrz1+=delta1[postDir];if(qerlo[qrtrze][qrtrz1]===true){doubleFields++;if(doubleFields>doubleFieldFactor){doubleFieldFactor=doubleFieldFactor*3;qrtrzDir=(qrtrzDir+5)%8;postDir=qrtrzDir}}else{qerlo[qrtrze][qrtrz1]=true;doubleFields=0;doubleFieldFactor=3}}else if(e.data.done===false){collisions.push([qrtrze+deltae[postDir],qrtrz1+delta1[postDir]]);if(fields>1200){buildBorder();qrtrzDir=1;while(ztux[qrtrze+deltae[qrtrzDir]][qrtrz1+delta1[qrtrzDir]]!==true){qrtrzDir=(qrtrzDir+2)%8}qrtrzDir=(qrtrzDir+6)%8;onmessage=stage2;e.data.done=null;stage2(e);return}qrtrzDir=(qrtrzDir+5)%8;postDir=qrtrzDir}switch(qrtrzDir){case 0:postDir=dirSwitch?1:7;break;case 2:postDir=dirSwitch?1:3;break;case 4:postDir=dirSwitch?3:5;break;case 6:postDir=dirSwitch?5:7;break}dirSwitch=!dirSwitch;fields++;postMessage({id:e.data.id,direction:dirStrings[postDir]})}function stage2(e){qrtrzDir=(qrtrzDir+2)%8;if(ztux[qrtrze+deltae[qrtrzDir]][qrtrz1+delta1[qrtrzDir]]===true){qrtrzDir=(qrtrzDir+6)%8;if(ztux[qrtrze+deltae[qrtrzDir]][qrtrz1+delta1[qrtrzDir]]===true){qrtrzDir=(qrtrzDir+6)%8;if(ztux[qrtrze+deltae[qrtrzDir]][qrtrz1+delta1[qrtrzDir]]===true){qrtrzDir=(qrtrzDir+6)%8;if(ztux[qrtrze+deltae[qrtrzDir]][qrtrz1+delta1[qrtrzDir]]===true){qerlo=ztux;onmessage=stage3;stage3(e);return}}}}var t=(qrtrzDir+7)%8;var n=(qrtrzDir+6)%8;var r=(qrtrzDir+5)%8;var i=(qrtrzDir+2)%8;if(ztux[qrtrze+deltae[t]][qrtrz1+delta1[t]]!==true&&ztux[qrtrze+deltae[n]][qrtrz1+delta1[n]]!==true&&ztux[qrtrze+deltae[r]][qrtrz1+delta1[r]]!==true&&ztux[qrtrze+deltae[i]][qrtrz1+delta1[i]]===true){ztux[qrtrze][qrtrz1]=true}var i=(qrtrzDir+2)%8;var s=(qrtrzDir+4)%8;var n=(qrtrzDir+6)%8;if(ztux[qrtrze+deltae[i]][qrtrz1+delta1[i]]===true&&ztux[qrtrze+deltae[s]][qrtrz1+delta1[s]]===true&&ztux[qrtrze+deltae[n]][qrtrz1+delta1[n]]===true){ztux[qrtrze][qrtrz1]=true}qrtrze+=deltae[qrtrzDir];qrtrz1+=delta1[qrtrzDir];postMessage({id:e.data.id,direction:dirStrings[qrtrzDir]})}function stage3(e){if(e.data.done===true){qrtrze+=deltae[postDir];qrtrz1+=delta1[postDir];if(qerlo[qrtrze][qrtrz1]===true){doubleFields++;if(doubleFields>doubleFieldFactor){doubleFieldFactor=doubleFieldFactor*3;qrtrzDir=(qrtrzDir+5)%8;postDir=qrtrzDir}}else{qerlo[qrtrze][qrtrz1]=true;doubleFields=0;doubleFieldFactor=3}}else if(e.data.done===false){qrtrzDir=(qrtrzDir+5)%8;postDir=qrtrzDir}switch(qrtrzDir){case 0:postDir=dirSwitch?1:7;break;case 2:postDir=dirSwitch?1:3;break;case 4:postDir=dirSwitch?3:5;break;case 6:postDir=dirSwitch?5:7;break}dirSwitch=!dirSwitch;postMessage({id:e.data.id,direction:dirStrings[postDir]})}function buildBorder(){var e,t;var n=1;var r=collisions.length;var i=collisions[r-1][0];var s=collisions[r-1][1];for(var o=0;o<r;o++){var u=collisions[o][0];var a=collisions[o][1];if(ztux[u][a]!==true){e=u;t=a;do{while(qerlo[e+deltae[n]][t+delta1[n]]===true){n=(n+1)%8}while(qerlo[e+deltae[n]][t+delta1[n]]!==true){n=(n+1)%8}n=(n+7)%8;e+=deltae[n];t+=delta1[n];ztux[e][t]=true}while(e!==u||t!==a);do{while(qerlo[e+deltae[n]][t+delta1[n]]===true){n=(n+1)%8}while(qerlo[e+deltae[n]][t+delta1[n]]!==true){n=(n+1)%8}n=(n+7)%8;var f=(n+2)%8;var l=e+deltae[f];var c=t+delta1[f];if(l!==i&&c!==s){var h=(f+7)%8;var p=f;var d=(f+1)%8;if(ztux[l+deltae[h]][c+delta1[h]]!==true&&ztux[l+deltae[p]][c+delta1[p]]!==true&&ztux[l+deltae[d]][c+delta1[d]]!==true){ztux[l][c]=true}}e+=deltae[n];t+=delta1[n];ztux[e][t]=true}while(e!==u||t!==a)}}}function logging(){console.log(JSON.stringify(qerlo));console.log(JSON.stringify(ztux));console.log(JSON.stringify(collisions));console.log(qrtrze+", "+qrtrz1)}var dirStrings=[null,"down",null,"left",null,"up",null,"right"];var dirSwitch=true;var postDir=null;var deltae=[-1,+0,+1,+1,+1,+0,-1,-1];var delta1=[-1,-1,-1,+0,+1,+1,+1,+0];var qrtrze=102;var qrtrz1=102;var qrtrzDir=0;var qerlo=new Array(204);for(var i=0;i<204;i++){qerlo[i]=new Array(204)}var collisions=new Array;var doubleFields=0;var doubleFieldFactor=3;var fields=0;var ztux=new Array(204);for(var i=0;i<204;i++){ztux[i]=new Array(204)}onmessage=stage1