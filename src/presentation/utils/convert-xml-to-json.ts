import { ConsumeUserDataModel } from "../../domain/usecases/consume-user-data";
import { parseString } from "xml2js"

export class ConvertXmlToJson {
  handle (consumeUserData: ConsumeUserDataModel): any {
    let consumeUserDataConvertedInJson
    parseString(consumeUserData.text || '', function (err, results) {
      consumeUserDataConvertedInJson = JSON.stringify(results)
      consumeUserDataConvertedInJson = JSON.parse(consumeUserDataConvertedInJson)
    });

    return consumeUserDataConvertedInJson
  }
}