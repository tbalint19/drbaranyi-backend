const { programaticallyPreassingRoot, login } = require('./user-endpoint')
const { assignAdminRole } = require('./role-endpoint')

const loginAsAdmin = async ({ googleId, email }) => {
  await programaticallyPreassingRoot('rootUser999@company.hu')

  const sessionToken = await login({
    googleId: '999',
    email: 'rootUser999@company.hu',
  })

  await assignAdminRole({
    as: sessionToken,
    to: email,
  })

  const adminToken = await login({
    googleId: googleId,
    email: email,
  })

  return adminToken
}

module.exports = {
  loginAsAdmin,
}
