const express = require("express")
const router = express.Router()
const csvFilePath='Hospitals.csv'
const csv=require('csvtojson')
let jsonArray;
var containFields = 'FacilityID,FacilityName,Address,City,State,ZIPCode,CountyName,PhoneNumber,HospitalType,HospitalOwnership,EmergencyServices,MeetscriteriaforpromotinginteroperabilityofEHRs,Hospitaloverallrating,Hospitaloverallratingfootnote,MORTGroupMeasureCount,CountofFacilityMORTMeasures,CountofMORTMeasuresBetter,CountofMORTMeasuresNoDifferent,CountofMORTMeasuresWorse,MORTGroupFootnote,SafetyGroupMeasureCount,CountofFacilitySafetyMeasures,CountofSafetyMeasuresBetter,CountofSafetyMeasuresNoDifferent,CountofSafetyMeasuresWorse,SafetyGroupFootnote,READMGroupMeasureCount,CountofFacilityREADMMeasures,CountofREADMMeasuresBetter,Count of READM Measures No Different,Count of READM Measures Worse,READM Group Footnote,Pt Exp Group Measure Count,Count of Facility Pt Exp Measures,Pt Exp Group Footnote,TE Group Measure Count,Count of Facility TE Measures,TE Group Footnote';
const arr = containFields.split(',');
// console.log(arr)

//optimization :)

const whole = (id) => {
   let x = "";
    for ( i = 0; i < arr.length; i++){
        x += arr[i] + " : " + jsonArray[id][arr[i]] + " | ";
    }
    return x;
}
const loopThroughAll = (id,data,res) => 
{
let i;
let j;
            for(j = 0; j < jsonArray.length; j++)
            {
                if(jsonArray[j]['FacilityName'].toLowerCase() == id.toLowerCase())
                {
                    // console.log(id.toLowerCase())
                    if(data == 'whole')
                    {
                        res.render("info", {text: whole(j)})
                    }
                    else{
                    for(i = 0; i < arr.length; i++)
                    {
                        // console.log(arr[i])
                        // console.log(data)
                        if(arr[i] == data)
                        {
                            // console.log("found!")
                            res.render("info", {text: jsonArray[j][data]})
                        }
                    }
                }
                }
            }
            res.status(404).render("404")

    
}

// router.get('/:id/whole', (req, res) =>{
//     // loop()
//     // res.send('Working')
//     getData();
//     const check = loop(req.params.id)
//     if(check == false)
//     {
//         res.status(404).send("Hospital does not exist in records")
//     }
//     else{
//     res.send(jsonArray[check])}
// })

router.get('/:id/:field', (req,res) => {
    getData();
    const check = loopThroughAll(req.params.id, req.params.field, res)
})

// router.get('/:id/FacilityID', (req, res) => {
//     getData();
//     // console.log(jsonArray)
//     const check = loop(req.params.id);
//     if(check == false)
//     {
//         res.status(404).send("Hospital does not exist in records")
//     }
//     else{
//     res.send(jsonArray[check]['FacilityID'])}
// })


router.get('/', (req, res) => {
    getData();
    // console.log(jsonArray)
    res.render("hospitals")
})



const getData = async () => 
{
    jsonArray= await csv().fromFile(csvFilePath);
}

// const loop = (id, data) => {
//         for(i = 0; i < jsonArray.length; i++){
//             if(jsonArray[i].FacilityName.toLowerCase() == id.toLowerCase()){
//                 return i;
//             }
//         }
//         return false;
// }

module.exports = router;
