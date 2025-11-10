// import React from "react";
// import classes from "./FilterBar.module.css";
//
// const FilterBar = ({ filters, setFilters }) => {
//
//     const toggleFilter = (category, value) => {
//         setFilters(prev => ({
//             ...prev,
//             [category]: prev[category] === value ? "" : value
//         }));
//     };
//
//     const filterOptions = {
//         difficulty: ["Facile", "Moyenne", "Difficile"],
//         duration: ["<1h", "1-3h", ">3h"],
//         distance: ["0-5 km", "5-15 km", "15+ km"],
//         theme: ["Nature", "Culture", "Sport"]
//     };
//
//     return (
//         <div className={classes['filter-bar']}>
//             {Object.entries(filterOptions).map(([category, options]) => (
//                 <div key={category} className={classes['filter-category']}>
//                     <span className={classes['category-title']}>{category.charAt(0).toUpperCase() + category.slice(1)}:</span>
//                     <div className={classes.tags}>
//                         {options.map(option => (
//                             <button
//                                 key={option}
//                                 className={`tag ${filters[category] === option ? "active" : ""}`}
//                                 onClick={() => toggleFilter(category, option)}
//                             >
//                                 {option}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };
//
// export default FilterBar;



import React from "react";
import classes from "./FilterBar.module.css";

const FilterBar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className={classes['filter-bar']}>
      <div className={classes['filter-item']}>
        <label>Difficulté:</label>
        <select name="difficulty" value={filters.difficulty} onChange={handleChange}>
          <option value="">Toutes</option>
          <option value="facile">Facile</option>
          <option value="moyenne">Moyenne</option>
          <option value="difficile">Difficile</option>
        </select>
      </div>

      <div className={classes['filter-item']}>
        <label>Durée:</label>
        <select name="duration" value={filters.duration} onChange={handleChange}>
          <option value="">Toutes</option>
          <option value="courte">Moins de 1h</option>
          <option value="moyenne">1h à 3h</option>
          <option value="longue">3h à 6h</option>
          <option value="extralongue">Plus de 6h</option>
        </select>
      </div>

      <div className={classes['filter-item']}>
        <label>Distance:</label>
        <select name="distance" value={filters.distance} onChange={handleChange}>
            <option value="">Toutes</option>
            <option value="courte">0-5 km</option>
            <option value="moyenne">5-10 km</option>
            <option value="longue">10-15 km</option>
            <option value="extralongue">15+ km</option>
        </select>
      </div>

      <div className={classes['filter-item']}>
        <label>Thème:</label>
        <select name="theme" value={filters.theme} onChange={handleChange}>
          <option value="">Tous</option>
          <option value="nature">Nature</option>
          <option value="ville">Ville</option>
          <option value="culture">Culture</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;