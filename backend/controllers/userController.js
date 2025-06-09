import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isUserExist = await User.findOne({ email });
    if (isUserExist)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      _id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      token: generateToken(user.id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "Email not found, please signup" });

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res.status(401).json({ message: "Entered wrong password" });

    res.status(201).json({
      message: "User Fetched Successfully",
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users with role 'user' found" });
    }

    res.status(200).json({ message: "Fetched users with role 'user'", users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  console.log(req.body, "77");
  try {
    const { name, email, role, userRole } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.userRole = userRole || user.userRole;

    const updatedUser = await user.save();
    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        userRole: updatedUser.userRole,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { signupUser, loginUser, getAllUser, updateUser, deleteUser };
