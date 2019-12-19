export const toKhNumber = (enNumber) => {
  let arr = enNumber.split("");
  let toKh = [];

  arr.forEach((s) => {
    switch (s) {
      case "1":
        toKh.push("១");
        break;
      case "2":
        toKh.push("២");
        break;
      case "3":
        toKh.push("៣");
        break;
      case "4":
        toKh.push("៤");
        break;
      case "5":
        toKh.push("៥");
        break;
      case "6":
        toKh.push("៦");
        break;
      case "7":
        toKh.push("៧");
        break;
      case "8":
        toKh.push("៨");
        break;
      case "9":
        toKh.push("៩");
        break;
      case "0":
        toKh.push("០");
        break;
      default:
        toKh.push(s);
        break;
    }
  });
  return toKh.join("");
};

//DD MMM YYYY
export const toKhMonth = (enM) => {
  if (enM === "1" || enM === "01" || enM === "Jan" || enM === "January" || enM === "jan") {
    return "មករា";
  }
  else if (enM === "2" || enM === "02" || enM === "Feb" || enM === "February" || enM === "feb") {
    return "កុម្ភៈ";
  }
  else if (enM === "3" || enM === "03" || enM === "Mar" || enM === "March" || enM === "mar") {
    return "មីនា";
  }
  else if (enM === "4" || enM === "04" || enM === "Apr" || enM === "April" || enM === "apr") {
    return "មេសា";
  }
  else if (enM === "5" || enM === "05" || enM === "May" || enM === "may") {
    return "ឧសភា";
  }
  else if (enM === "6" || enM === "06" || enM === "Jun" || enM === "June" || enM === "jun") {
    return "មិថុនា";
  }
  else if (enM === "7" || enM === "07" || enM === "Jul" || enM === "July" || enM === "jul") {
    return "កក្កដា";
  }
  else if (enM === "8" || enM === "08" || enM === "Aug" || enM === "August" || enM === "aug") {
    return "សីហា";
  }
  else if (enM === "9" || enM === "09" || enM === "Sep" || enM === "September" || enM === "sep") {
    return "កញ្ញា";
  }
  else if (enM === "10" || enM === "Oct" || enM === "October" || enM === "oct") {
    return "តុលា";

  }
  else if (enM === "11" || enM === "Nov" || enM === "November" || enM === "nov") {
    return "វិច្ឆិកា";
  }
  else if (enM === "12" || enM === "Dec" || enM === "December" || enM === "dec") {
    return "ធ្នូ";
  }
  else {
    return "n/a";
  }
};

export const toKhDay = (day, full = false) => {
  if (day === "mon" || day === "Mon" || day === "monday" || day === "Monday") {
    return 'ចន្ទ'
  } else if (day === "tue" || day === "Tue" || day === "tuesday" || day === "Tuesday") {
    return 'អង្គារ'
  } else if (day === "wed" || day === "Wed" || day === "wednesday" || day === "Wednesday") {
    return 'ពុធ'
  } else if (day === "thu" || day === "Thu" || day === "thursday" || day === "Thursday") {
    return full ? 'ព្រហស្បតិ៍' : 'ព្រហ';
  } else if (day === "fri" || day === "Fri" || day === "friday" || day === "Friday") {
    return 'សុក្រ'
  } else if (day === "sat" || day === "Sat" || day === "saturday" || day === "Saturday") {
    return 'សៅរ៍'
  } else if (day === "sun" || day === "Sun" || day === "sunday" || day === "Sunday") {
    return 'អាទិត្យ'
  } else {
    return 'n/a'
  }
};

//nationality

export const toKhNationality = (n) => {
  if (n === "Cambodian" || n === "Khmer") {
    return "ខ្មែរ";
  } else {
    return n;
  }
};


//Gender
export const toKhGender = (g, isShorten) => {
  if (g === "Male" || g === "M" || g === "male") {
    if (isShorten) {
      return "ប";
    } else {
      return "ប្រុស";
    }
  } else if (g === "Female" || g === "F" || g === "female") {
    if (isShorten) {
      return "ស";
    } else {
      return "ស្រី";
    }
  } else {
    return "n/a";
  }
};

export const toKhDate = ({date, separator = " ", longDate = false, shortFullDate = false, hideYear = false}) => {
  //dd/mm/yyyy/ddd
  //dd/mm/yy/ddd
  let arr = date.split("/");
  const day = toKhNumber(arr[0]);
  const month = toKhMonth(arr[1]);
  const year = toKhNumber(arr[2]);
  const dayDDD = toKhDay(arr[3]);
  if (shortFullDate) {
    if(hideYear){
      return dayDDD + separator + day + separator + month;
    }
    return dayDDD + separator + day + separator + month +  separator + year;
  } else {
    return longDate ? `ថ្ងៃទី${day} ខែ${month} ឆ្នាំ${year}` : day + separator + month + separator + year;
  }
};

export const toKhTime = ({time, separator = ":", second = false}) => {
  //hh:mm:ss:a
  let arr = time.split(":");
  const h = toKhNumber(arr[0]);
  const m = toKhNumber(arr[1]);
  let s = '';
  let a = '';
  if (arr.length > 2) {
    s = second ? separator + toKhNumber(arr[2]) + 'វិនាទី' : '';
    a = arr[3] === 'am' ? 'ព្រឹក' : 'ល្ងាច';
  }

  return `ម៉ោង${h}${separator}${m}នាទី${s} ${a}`;
};