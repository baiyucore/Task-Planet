import axios from "axios"


const testapi={
async  test(page:number){
  const response = await axios.post("https://irhidbbf7c.bja.sealos.run/test2",{
    page:page,
  });
  return response.data;
},

}

export {testapi}



