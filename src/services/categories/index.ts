import { Request, Response } from "express";
import pool, { executeSQLQuery } from "../../database";

export const getCategory = async () => {
  const query = "SELECT data->>'Formulair' AS formulair FROM public.stedy ORDER BY id ASC";

  try {
    const result = await executeSQLQuery(query);

    // Si la réponse contient des données, parse chaque champ 'formulair'
    return result.rows?.map((row) => {
      try {
        // Convertir le texte JSON en objet JavaScript
        return { ...row, formulair: JSON.parse(row.formulair) };
      } catch (error) {
        console.error("Erreur de parsing du JSON:", error);
        return { ...row, formulair: null }; // En cas d'erreur, retourner avec formulair = null
      }
    }) || [];
  } catch (error) {
    console.error("Erreur lors de l'exécution de la requête :", error);
    throw new Error("Impossible de récupérer les catégories.");
  }
};

export const getTree = async () => {
  const query = "SELECT data->>'text' AS text FROM public.stedy ORDER BY id ASC";
  const result = await executeSQLQuery(query);

  // Si la réponse contient des données, parsez chaque texte JSON
  if (result.rows && result.rows.length > 0) {
    result.rows = result.rows.map(row => {
      try {
        // Convertir le champ "text" en objet JSON
        row.text = JSON.parse(row.text);
      } catch (error) {
        console.error("Erreur de parsing du JSON:", error);
        row.text = null; // ou vous pouvez gérer l'erreur comme vous le souhaitez
      }
      return row;
    });
  }

  return result.rows;
};




export const updateUserData = async (iuud: string, data: any) => {
  const query = `
      UPDATE public.stedy
      SET data = jsonb_set(
        data,
        '{Formulair}',
        data->'Formulair' || jsonb_build_object(
          $1::text,  -- Ensure $1 is treated as text
          $2::jsonb  -- Ensure the data is treated as JSONB
        )
      )
      WHERE iuud = $3
      RETURNING *;  -- Optionally return the updated row(s) for confirmation
    `;

  const params = [
    iuud, // dynamic key (iuud), treated as text
    data, // the data to be added, treated as JSONB
    "1234567", // the iuud to match in the WHERE clause (consider dynamic value if needed)
  ];

  try {
    const result = await pool.query(query, params);
    return result.rows; // Return the updated rows (or any data from the query)
  } catch (error) {
    console.error("Error executing query:", error);
    throw error; // Throw the error to be handled in the controller
  }
};

export const updateTreeData = async (data: any) => {
    const query = `
      UPDATE public.stedy
      SET data = jsonb_set(
        data,
        '{text}',  -- Update the 'text' field
        $1::jsonb  -- Set 'text' to the value passed in as a parameter (data)
      )
      WHERE iuud = '1234567';  -- Filter by the fixed IUUD '1234567'
    `;
  
    const params = [data];  // Pass 'data' as the first parameter
  
    try {
      const result = await pool.query(query, params);
      return result.rows; // Return the updated row(s)
    } catch (error) {
      console.error("Error executing query:", error);
      throw error; // Handle errors appropriately
    }
  };
  
  
