import { ConsumeUserDataModel } from "../../domain/usecases/consume-user-data";
import { parseString } from "xml2js"

export class ConvertXmlToJson {
  handle (consumeUserData: ConsumeUserDataModel): any {
    let consumeUserDataConvertedInJson = `<?xml version="1.0" encoding="UTF-8" ?>${consumeUserData}`
    parseString(consumeUserData|| '', function (err, results) {
      consumeUserDataConvertedInJson = JSON.stringify(results)
      consumeUserDataConvertedInJson = JSON.parse(consumeUserDataConvertedInJson)
    });

    return consumeUserDataConvertedInJson
  }
}