import axios from "axios";
export async function postLoggingApi() {
  try {
    const res = await axios.post(
      "http://54.235.63.166:8000/insert/" +
        "{your_team" +
        ", " +
        "your_password" +
        ", " +
        "your_dbname" +
        ", " +
        "your_table" +
        ", " +
        "your_table_pk" +
        ", " +
        "crud" +
        ", " +
        "your_username}" +
        "?&your_team=" +
        team.teamCode +
        "&your_password=" +
        team.teamPassword +
        "&your_dbname=" +
        team.teamDbName +
        "&your_table=" +
        team.teamDbTable +
        "&your_table_pk=" +
        1 +
        "&crud=" +
        team.teamCrud +
        "&your_username=" +
        team.teamUsername
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}
