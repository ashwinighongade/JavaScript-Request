userInput=require("readline-sync");
fs=require("fs");
axioss=require("axios");
url1=axioss.get("https://api.merakilearn.org/courses")
// console.log(url);

.then(res=>{
    link1=res.data
    // console.log(link1);
    fs.writeFileSync("course.json",JSON.stringify(link1,null,3));
    read=fs.readFileSync("course.json");
    read=JSON.parse(read);
    // console.log(read);
    s_No=1
    for(i of read){
        console.log(s_No,i["name"]);
        s_No++
    }
    courseNumber=userInput.questionInt("enter the number of any course:-");
    console.log("\n",read[courseNumber-1]["name"],read[courseNumber-1]["id"],"\n");
    courseName=read[courseNumber-1]["name"]
    id=read[courseNumber-1]["id"]
    url2=axioss.get("http://api.merakilearn.org/courses/"+id+"/exercises")

    .then(resol=>{
        link2=resol.data
        // console.log(link2);
        fs.writeFileSync(courseName+".json",JSON.stringify(link2,null,3));
        read1=fs.readFileSync(courseName+".json");
        read1=JSON.parse(read1);
        // console.log(read1);
        count1=1
        for(i of read1["course"]["exercises"]){
            console.log(count1,i["name"]);
            console.log("\t",i["slug"]);
            count1++
        }
        slugNumber=userInput.questionInt("enter any slug number:-");
        slugNumber=slugNumber-1
        for(i of read1["course"]["exercises"][slugNumber]["content"]){
            console.log(i["value"]);
        }


        while(slugNumber<(read1["course"]["exercises"]).length){
            previousNext=userInput.question("enter slug number you wnat previous or Next:-");
            if(previousNext==="p"){
                slugNumber-=1
                if(slugNumber>=0){
                    for(i of read1["course"]["exercises"][slugNumber]["content"]){
                        console.log(i["value"]);
                    }
                }else{
                    console.log("This is your last slug");
                    break;
                }
            }

            
            else if(previousNext==="n"){
                slugNumber+=1
                if(slugNumber<(read1["course"]["exercises"]).length){
                    console.log(read1["course"]["exercises"][slugNumber]["name"])
                    for(i of read1["course"]["exercises"][slugNumber]["content"]){
                        console.log(i["value"]);
                    }   
                }
                else{
                    console.log("Topic is complete");
                    break;
                }
            }
            else{
                console.log("enter valid user input");
            }
        }
    })


    .catch((rejec)=>{
        console.log(rejec);
    })


})
.catch((error)=>{
    console.log(error);
})