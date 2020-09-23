function showTime() {
    let now = new Date();
    let end = new Date("2020/9/10,11:29:20");

    let leftTime = parseInt((end.getTime() - now.getTime()) / 1000);
    // console.log(leftTime)

    let day = parseInt(leftTime / (24 * 60 * 60));
    let hour = parseInt(leftTime / (60 * 60) % 24);
    let minute = parseInt(leftTime / 60 % 60);
    let second = parseInt(leftTime % 60);

    hour = leftPad(hour)
    minute = leftPad(minute)
    second = leftPad(second)

    console.log("Left Time: " + day + 'days' + ": " + hour + ": " + minute + ": " + second)

    if(leftTime <= 0){
        return
    }

    setTimeout(showTime,1000)
}

function leftPad(num) {
    return num < 10 ? '0'+num : num+'';
}

showTime()