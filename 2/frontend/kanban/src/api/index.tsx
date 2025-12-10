import axios from "axios";
import { Loader } from "@mantine/core";
import { useState } from "react";

export const leadApi = {

  async leadGet() {
    try {
      const response = await axios.get("http://localhost:8080/api/leads");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async leadPost(data) {
    try {
      const response = await axios.post("http://localhost:8080/api/leads", data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
},

async patchLead(id, data) {
  try {
    const response = await axios.patch(
      `http://localhost:8080/api/leads/${id}`,{
      status: data
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
},

  async deleteLead(id) {
    console.log(id);
    try {
      const response = await axios.delete(`http://localhost:8080/api/leads/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};