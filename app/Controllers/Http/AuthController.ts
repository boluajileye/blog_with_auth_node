import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from "App/Models/User";
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {
    
  public async register({ request, response }: HttpContextContract) {
    // create validation schema for expected user form data
    const userSchema = schema.create({
      username: schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'username', caseInsensitive: true })]),
      firstname: schema.string({ trim: true }, [rules.maxLength(255)]),
      lastname: schema.string({ trim: true }, [rules.maxLength(255)]),
      role_type: schema.string({ trim: true }, [rules.maxLength(255)]),
      email: schema.string({ trim: true }, [rules.email(), rules.unique({ table: 'users', column: 'email', caseInsensitive: true })]),
      password: schema.string({}, [rules.minLength(8)])
    })
    // get validated data by validating our userSchema
    // if validation fails the request will be automatically redirected back to the form
    const data = await request.validate({ schema: userSchema })
    // create a user record with the validated data
    const user = await User.create(data)
    
    return response.ok({
        "error": 'false',
         "code": "200",
         "message": "User registered Successfully",
         "data": user
     })
  }

  public async login({ request, response, auth }: HttpContextContract) {
    // grab email and password values off request body
    const { email, password } = request.only(['email', 'password'])
    try {
            
        // Lookup user manually
        const user = await User
          .query()
          .where('email', email)
          .firstOrFail()
      
        // Verify password
        if (!(await Hash.verify(user.password, password))) {
          return response.unauthorized({
            "error": 'true',
             "code": "400",
             "message": "User Logged Failed | Invalid Credentials"
         })
        }
      
        // Generate token
        const token = await auth.use('api').generate(user)
        
        return response.ok({
            "error": 'false',
             "code": "200",
             "message": "User Logged In Successfully",
             "data": user,
             "token": token
         })
    } catch (error) {
        
      return response.ok({"message": "Error while Authenticating"});
      
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    // logout the user
    await auth.logout()
    // redirect to login page
    return response.ok({
        "error": 'false',
         "code": "200",
         "message": "User Logged Out"
     })
  }
}
