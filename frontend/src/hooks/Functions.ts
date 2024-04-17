// For giving current date in good format
export function currentDate(){
  const currentDate = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const newDate = `${
    monthNames[currentDate.getMonth()]
  } ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
  
  return newDate;
}

// for the avatar name colour
export function getRandomColor(){
  const colors = ['bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-teal-500', 'bg-cyan-500', 'bg-gray-500', 'bg-gray-700'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  
  return colors[randomIndex];
}
