export async function deleteChara() {
    if (confirm("Are you sure?") == true) {
      try {
        let resp = await fetch(
          "https://character-database.becode.xyz/characters/" + idChara,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!resp.ok) {
          throw new Error("ID not found");
        } else {
            window.location.href = "index.html"
        }
      } catch (err) {
        alert(err);
      }
    }
  }