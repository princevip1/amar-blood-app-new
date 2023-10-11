const ageCalcualetor = (birthOfDate) => {
    const today = new Date();
    const birthDate = new Date(birthOfDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

export default ageCalcualetor;