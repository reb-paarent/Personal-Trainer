import type { TrainingsWithCustomerData } from "./types";

export function GetTrainings() {
  return fetch(import.meta.env.VITE_API_URL + "/gettrainings").then((response) => {
    if (!response.ok) {
      throw new Error("Error when fetching trainings");
    }

    return response.json() as Promise<TrainingsWithCustomerData[]>;
  });
}

export function DeleteTraining(url: string) {
  return fetch(url, { method: "DELETE" }).then((response) => {
    if (!response.ok) {
      throw new Error("Something went wrong in deletion.");
    }
  });
}

export function GetCustomers() {
   return fetch(import.meta.env.VITE_API_URL + "/customers")
  .then(response => {
    if (!response.ok) {
      throw new Error("Error when fetching customers");
    }

    return response.json();
  })
}

export function DeleteCustomer(url: string) {
  return fetch(url, { method: 'DELETE' })
  .then(response => {
      if (!response.ok)
          throw new Error("Something went wrong in deletion.");

      return response.json();
  })
}