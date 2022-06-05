import { ConvertXmlToJson } from "../../../presentation/utils/convert-xml-to-json"

export const makeConvertXmlToJsonFactory = () => {
  return new ConvertXmlToJson()
}