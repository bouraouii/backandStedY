import { getCategories, getTree } from "../../services/categories";

import { Request, Response } from "express";

export const getRequestController = async (req: Request, res: Response) => {

  try {
  
    
    const result = await getCategories();
    res.status(200).json(Object.values(result)[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};


export const getTreeController = async (req: Request, res: Response) => {
  try {
    const result = await getTree();

    // Handle empty result set
    if (!result || result.length === 0) {
      return res.status(404).json({ error: "No data found" });
    }

    // Send the first row or the entire result based on requirement
    res.status(200).json(result[0]); // Or use `res.status(200).json(result);` for all rows
  } catch (error) {
    console.error("Error in getTreeController:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};