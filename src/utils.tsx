export const prefix = "https://static.wixstatic.com/media/";
export const removeUnusedDataFromUrl=(url:string)=>{
    let tempUrl= url.replace('wix:image://v1/',prefix)
    const index= tempUrl.indexOf('.jpg'||'.png'||'.svg')
    tempUrl=tempUrl.slice(0,index+4)
    console.log(tempUrl);
    
    return  tempUrl
    // wix:image://v1/557f26_db69102dd0af435ab2bb8ece5d6fedb5~mv2.jpg/322117720_691162432500140_4412115213330647962_n.jpg__nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc#originWidth=880&originHeight=879
    }