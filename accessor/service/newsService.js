const getCurrentDateMinusTwoDays = () => {
    const currentDate = new Date();
    
    currentDate.setDate(currentDate.getDate() - 2);
    
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day} 00:00:00`;
    return formattedDate;
};

export default getCurrentDateMinusTwoDays;