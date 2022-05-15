export class TransformUserData {
  handle (userData: any): any {
    // const userDataDt = `<?xml version="1.0" encoding="UTF-8" ?>${userData.text}`
    // let userJsonData
    // parseString(userXmlData, function (err, results) {
    //   userJsonData = JSON.stringify(results)
    //   userJsonData = JSON.parse(userJsonData)
    // })
    // return {}
    return {
      fullName: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      adress: "any_adress",
      addressNumber: 0,
      phoneNumber: "any_phone"
    }
  }   
}