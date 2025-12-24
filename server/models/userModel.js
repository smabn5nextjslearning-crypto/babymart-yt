import mongoose from "mongoose"
import bcrypt from "bcryptjs"
 


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
    avatar: {
        type: String,
        default: "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png",
    },
    role: {
        type: String,
        enum: ["admin", "user", "deliveryman"],
        default: "user",
      },
    addresses: [
        {
          street: {
            type: String,
            required: true,
          },
          city: {
            type: String,
            required: true,
          },
          country: {
            type: String,
            required: true,
          },
          postalCode: {
            type: String,
            required: true,
          },
          isDefault: {
            type: Boolean,
            default: false,
          },
        },
      ],
}, {
    timestamps: true,   
    
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) { 
  return await bcrypt.compare(enteredPassword, this.password);
}

// Encrypt password using bcrypt
userSchema.pre("save",async function (next) {
  if (!this.isModified("password")) { 
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Ensure only one address is default
userSchema.pre("save", function (next) { 
  if (this.isModified("addresses")) { 
    const defaultAddress = this.addresses.find(addr => addr.isDefault);
    if (defaultAddress) { 
      this.addresses.forEach(addr => { 
        if (addr !== defaultAddress) { 
          addr.isDefault = false;
        }
      });

    }
  }
  next();
});


const User = mongoose.model("User", userSchema);

export default User;