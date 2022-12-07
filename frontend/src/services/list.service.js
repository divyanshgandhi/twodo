import http from "../http-common";

class ListDataService {
    // Get all lists
    getAll() {
        return http.get("/lists");
    }

    // Get a list by id
    get(id) {
        return http.get(`/lists/${id}`);
    }

    // Create a new list
    create(data) {
        return http.post("/lists", data);
    }

    // Update a list by id
    update(id, data) {
        return http.put(`/lists/${id}`, data);
    }

    // Empty a list
    empty(id) {
        return http.put(`/lists/${id}/empty`);
    }

    // Delete a list by id
    delete(id) {
        return http.delete(`/lists/${id}`);
    }
}

export default new ListDataService();