export const isValidPhoneNumber = (value: string) => {
  if (value.match(/12345/)) {
    return "Invalid phone number containing '12345'.";
  } else if (value.length < 10) {
    return false; // Invalid if less than 10 digits
  } else {
    return true; // Valid
  }
};

export const refinePhoneNumber = (phoneNumber: string) => {
  if (phoneNumber.trim() === "") {
    return true; // Allow empty string
  }
  return isValidPhoneNumber(phoneNumber);
};

export const isValidPhotoUrl = async (photoLink: string | null | undefined) => {
  if (photoLink === "" || /^(https?:\/\/[^\s$.?#].[^\s]*)$/i.test(photoLink!)) {
    return true;
  } else {
    return false;
  }
};
