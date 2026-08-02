const originalFetch = window.fetch.bind(window);

window.fetch = (input, init = {}) => {
    const method = (init.method || "GET").toUpperCase();
    const token = localStorage.getItem("token");

    if (token && !["GET", "HEAD"].includes(method)) {
        const headers = new Headers(init.headers || {});
        headers.set("Authorization", `Bearer ${token}`);

        return originalFetch(input, {
            ...init,
            headers
        });
    }

    return originalFetch(input, init);
};
