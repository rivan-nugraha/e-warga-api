class FormatStringObject {
  format (dataObject: any, ignoreObject: any) {
    if (!Array.isArray(dataObject)) {
      this.doFormat(dataObject, ignoreObject);
    } else {
      dataObject.map((object) => {
        this.doFormat(object, ignoreObject);
      });
    }

    return dataObject;
  }

  doFormat (dataObject: any, ignoreObject: any) {
    Object.keys(dataObject).map((key, index) => {
      if (typeof dataObject[key] === "string") {
        const resultCek = ignoreObject.find((element: any) => String(element).toUpperCase().trim() === String(key).toUpperCase().trim());
        if (!resultCek) {
          dataObject[key] = String(dataObject[key]).toUpperCase().trim();
        }
      }
    });

    return dataObject;
  }

  stringToBoolean (stringValue: string) {
    switch (stringValue?.toLowerCase()?.trim()) {
      case "true":
        return true;
      case "false":
        return false;
      default:
        throw new Error("Cannot Convert To Boolean");
    }
  }

  romanize(num: number) {
    let lookup: any = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
    for ( i in lookup ) {
      while ( num >= lookup[i] ) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  }
}

export default FormatStringObject;
