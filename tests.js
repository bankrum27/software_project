const chai = window.chai
const expect = chai.expect

//login.js
describe('(login.js) validateAccount', () => {
  it('should validate account information before signing in.', () => {
    expect(validateAccount('RGreen','RGfuel10!')).to.deep.equal(true)
    expect(validateAccount('JSmith','Fuelprice10')).to.deep.equal(true)
    expect(validateAccount('JSmith','Fuelprice11')).to.deep.equal(false)
    expect(validateAccount('Dusty', 'Katt12345')).to.deep.equal(false)
  })
})

//register.js
describe('(register.js) validateRegistration', () => {
  it('should validate account registration.', () => {
    expect(validateRegistration('BSmith','BSmithPetrol99!')).to.deep.equal(true)
    expect(validateRegistration('RGreen','RGfuel10!')).to.deep.equal(false)
    expect(validateRegistration('Fuel10','Fueling10!')).to.deep.equal(true)
  })
})

//user_profile.js
describe('(user_profile.js) confirmChanges', () => {  
  it('should confirm changes to the user profile fields.', () => {
    expect(confirmChanges('JSmith', 'Joseph Smith', '46 Overlook St', '', 'Houston', 'TX', '77044')).to.deep.equal(true)
    expect(confirmChanges('JSmith', 'Joseph Smith', '46 Overlook St', '', 'Columbus', 'OH', '77044')).to.deep.equal(false)
  })
})

describe('(user_profile.js) populateFields', () => {  
  it('should confirm changes to the user profile fields.', () => {
    expect(populateFields('Joseph Smith', '46 Overlook St', '', 'Houston', 'TX', '77044')).to.deep.equal(true)
    expect(populateFields('Joseph Smith', '46 Overlook St', '', 'Columbus', 'OH', '77044')).to.deep.equal(true)
  })
})

//quote.js
describe('(quote.js) calculateMargin', () => {  
  it('should calculate the price margin depending on state, number of gallons, and order history.', () => {
    expect(calculateMargin(5000, "TX", false)).to.deep.equal(8550)
    expect(calculateMargin(8500, "OH", true)).to.deep.equal(14662.5)
    expect(calculateMargin(8500, "TX", true)).to.deep.equal(14407.5)
  })
})