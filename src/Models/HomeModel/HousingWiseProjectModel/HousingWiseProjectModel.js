export class Housing {
    constructor(data) {
      this.id =  data.id|| "Housing ID null";
      this.name =  data.name||"Unknown Housing";
      this.total_projects =  data.total_projects|| "There is no projects";
    }
  }
  const fetchHousingWiseProjects = async () => {
      const token = localStorage.getItem("user_token");
      const response = await fetch("https://sna.shopnoneer.com/api/housing-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      const housing = result || [];
      const housingModel = housing.map(housing => new Housing(housing));
      console.log(housingModel);
      
      return{
        housing:housingModel
      };
    };
    
    export default fetchHousingWiseProjects;
    