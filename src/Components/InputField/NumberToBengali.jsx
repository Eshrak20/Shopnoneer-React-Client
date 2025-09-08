const numberToBengaliWords = (num) => {
    const ones = [
      "",
      "এক",
      "দুই",
      "তিন",
      "চার",
      "পাঁচ",
      "ছয়",
      "সাত",
      "আট",
      "নয়",
      "দশ",
      "এগারো",
      "বারো",
      "তেরো",
      "চোদ্দো",
      "পনেরো",
      "ষোল",
      "সতেরো",
      "আঠারো",
      "ঊনিশ",
    ];
  
    const tens = [
      "",
      "দশ",
      "বিশ",
      "ত্রিশ",
      "চল্লিশ",
      "পঁইত্রিশ",
      "সুত্তর",
      "আশি",
      "নব্বই",
    ];
  
    const thousands = ["", "হাজার", "লক্ষ", "কোটি"];
  
    let words = "";
  
    if (num === 0) {
      return "শূন্য";
    }
  
    // Break the number into sections (thousands, lakhs, crores)
    let section = 0;
    while (num > 0) {
      let chunk = num % 1000;
      if (chunk > 0) {
        words = convertChunkToBengali(chunk) + (thousands[section] ? " " + thousands[section] : "") + " " + words;
      }
      num = Math.floor(num / 1000);
      section++;
    }
  
    return words.trim();
  };
  
  const convertChunkToBengali = (chunk) => {
    const ones = [
      "",
      "এক",
      "দুই",
      "তিন",
      "চার",
      "পাঁচ",
      "ছয়",
      "সাত",
      "আট",
      "নয়",
      "দশ",
      "এগারো",
      "বারো",
      "তেরো",
      "চোদ্দো",
      "পনেরো",
      "ষোল",
      "সতেরো",
      "আঠারো",
      "ঊনিশ",
    ];
  
    const tens = [
      "",
      "দশ",
      "বিশ",
      "ত্রিশ",
      "চল্লিশ",
      "পঁইত্রিশ",
      "সুত্তর",
      "আশি",
      "নব্বই",
    ];
  
    let words = "";
    const hundred = Math.floor(chunk / 100);
    const ten = Math.floor((chunk % 100) / 10);
    const one = chunk % 10;
  
    // Handle hundreds
    if (hundred > 0) {
      words += ones[hundred] + " শত ";
    }
  
    // Handle tens and ones
    if (ten > 1) {
      words += tens[ten] + " ";
      words += ones[one];
    } else if (ten === 1) {
      words += ones[10 + one];
    } else if (one > 0) {
      words += ones[one];
    }
  
    return words.trim();
  };
  
  export default numberToBengaliWords;
  