async function photo1(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("photo1")
        },5000)
    })
}
async function photo2(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("photo2")
        },2000)
    })
}
async function photo3(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("photo3")
        },4000)
    })
}
async function photo4(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("photo4 loading fail")
        },5000)
    })
}
// async function photo1(){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolved("photo1")
//         },5000)
//     })
// }
// async function photo1(){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolved("photo1")
//         },5000)
//     })
// }
// async function photo1(){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolved("photo1")
//         },5000)
//     })
// }

const photofns = [photo1,photo2,photo3,photo4];

async function getPhotoDetails(){
    const photos = [1,2,3,4]
    try{
        const result = await Promise.all(photos.map(async(photo) => await photofns[photo-1]()));
        throw new Error("sync error")
        console.log(result);
    }catch(e){
        console.log("not exec")
        console.log(e)
    }
    
}

getPhotoDetails();