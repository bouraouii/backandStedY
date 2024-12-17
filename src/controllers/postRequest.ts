
import { updateTreeData, updateUserData } from "../services/categories";
import pool from "../database";
import { Request, Response } from "express";




export const postRequest = async (req: Request, res: Response) => {
  try {
    // Assuming the body structure is something like { iuud: <value>, data: <value> }
    const iuud = Object.keys(req.body)[0]; // Get the first key as the iuud
    const data = req.body[iuud]; // Access the data value using the iuud

    // Call the updateUserData function to perform the database update
    const result = await updateUserData(iuud, data);

    if (result) {
      // Send response if update was successful
      res.status(200).send("Data successfully updated");
    } else {
      // If no result is returned (e.g., no matching 'iuud')
      res.status(404).send("User not found");
    }
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const postTree = async (req: Request, res: Response) => {
  try {
   
    const data = req.body // Access the data value using the iuud

    // Call the updateUserData function to perform the database update
   const result = await updateTreeData(data);

    if (result) {
      // Send response if update was successful
      res.status(200).send("Data successfully updated");
    } else {
      // If no result is returned (e.g., no matching 'iuud')
      res.status(404).send("User not found");
    }
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
