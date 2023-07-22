const { verifyToken } = require("../utils/jwt");
const {
  getProjectLeadByTaskId,
  getProjectLeadByProjectId,
} = require("../utils/project");

const auth = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(" ");
    const user = verifyToken(token);

    if (!user) {
      return res.status(403).send("auth failed...");
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).send("auth failed...");
  }
};

const projectLeadAuth = [
  auth,
  async (req, res, next) => {
    try {
      const user = req.user;
      const { project_id, task_id } = req.params;

      let lead;
      if (project_id) {
        lead = await getProjectLeadByProjectId(project_id);
      } else if (task_id) {
        lead = await getProjectLeadByTaskId(task_id);
      } else {
        lead = null;
      }
      console.log(lead,user);

      if (lead?.user_id !== user.id) {
        return res.status(403).send("project lead auth failed...");
      }

      next();
    } catch (error) {
      return res.status(403).send("project lead auth failed...");
    }
  },
];
const adminAuth = [
  auth,
  (req, res, next) => {
    const { is_admin } = req.user;
    if (is_admin) {
      next();
    }

    return res.status(403).send("admin auth failed...");
  },
];

module.exports = {
  auth,
  adminAuth,
  projectLeadAuth,
};
