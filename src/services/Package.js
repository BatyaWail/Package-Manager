import { observable, makeObservable, action } from "mobx";
class Package {
  listPackages = [];
  isListChange=false;
  constructor() {
    makeObservable(this, {
      listPackages: observable,
      getPackages: action,
      isListChange:observable,
      postPackage:action,
      deletePackage:action
    });
  }

  getPackages = async () => {
    const response = await fetch("https://run.mocky.io/v3/5db391d9-8f54-4826-ac52-6d825806b89e")
    // .then(response => response.json())
    // .then(data => console.log("data",data))
    //  .catch((error) =>{
    //    console.error(error);
    //  });
    if (response.status === 200) {
      this.listPackages = await response.json();
      console.log("list=-----",this.listPackages);
    } else {
      console.log("error");
      return null;
    }
  };
  postPackage = async (pakage) => {
    
    // const responses = await fetch("https://run.mocky.io/v3/5db391d9-8f54-4826-ac52-6d825806b89e", {
    //   method: "POST",
    //   body: JSON.stringify(pakage),
    // });
    // if (responses.status === 200) {
    //   console.log("success!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    //   return true
    // } else {
    //   console.log("error");
    //   return null;
    // }
    this.listPackages.push(pakage)
    this.isListChange=true;
    return this.listPackages
  };
  deletePackage = async (name) => {
   
    const responses = await fetch(`https://run.mocky.io/v3/5db391d9-8f54-4826-ac52-6d825806b89e/${name}`, {
      method: "DELETE",
    });
    if (responses.status === 200) {
      console.log("success!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      return true
    } else {
      console.log("error");
      return null;
    }
  };
}
export default new Package();