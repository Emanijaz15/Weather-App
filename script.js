let country=document.querySelector("#count");
let time=document.querySelector("#time");
let degree=document.querySelector("#degree");
let weather=document.querySelector(".weather-type");
let min=document.querySelector(".min");
let max=document.querySelector(".max");
let feel=document.querySelector("#tempOne");
let wind=document.querySelector("#tempTwo");
let humidity=document.querySelector("#tempThree");
let pressure=document.querySelector("#tempFour");
let icon=document.querySelector(".cloud");
let search=document.querySelector(".search");
let input=document.querySelector(".inputin");



let city="Sargodha";
search.addEventListener("submit",(e)=>{
    e.preventDefault();
    city=input.value;
    weatherFunc();
    input.value="";
})

const weatherFunc=async()=>{
    const weatherUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=933c97c164f97834107861ea05ad4420`;
    try{
        const response= await fetch(weatherUrl);
        const data= await response.json();
        country.innerText=`${data.name},${new Intl.DisplayNames([data.sys.country], { type: "region" }).of(data.sys.country)}`;
        const options={
            weekDay:"long",
            year:"numeric",
            month:"long",
            day:"numeric",
            hour:"numeric",
            minute:"numeric",
        };
        const dateF= new Intl.DateTimeFormat("en-US",options).format(new Date(data.dt*1000));
        time.innerText=dateF;
        degree.innerHTML=`${Math.round(data.main.temp-273.15)}&#176`;
        weather.innerText=data.weather[0].main;
        icon.innerHTML=`<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>`;
        

        max.innerHTML=`Max:${data.main.temp_max.toFixed()}&#176`;
        min.innerHTML=`Mix:${data.main.temp_min.toFixed()}&#176`;
        feel.innerHTML=`${data.main.feels_like.toFixed()}&#176`;
        wind.innerHTML=`${data.wind.speed} m/s`;
        humidity.innerHTML=`${data.main.humidity}%`;
        pressure.innerHTML=`${data.main.pressure}hPa`;
    }catch(error){
        console.log(error);
        alert("ERROR");
    }
}

document.body.addEventListener("load", weatherFunc());