import { useEffect, useState  } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

import useAuth from "../hooks/useAuth";

const loginSchema = z.object({
  username: z.string().trim().min(3, "Username is required"),
  password: z.string().trim().min(3, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
function Login() {

  const [usersLoading, setUsersLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { error, token, login, allUsers, fetchAllUsers  } = useAuth();

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

   if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data: LoginFormValues): Promise<void> => {
    const success = await login({
      username: data.username.trim(),
      password: data.password.trim(),
    });

    if (success) {
      navigate("/dashboard", { replace: true });
    }
  };

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

const handleFetchAllUsers = async (): Promise<void> => {
  try {
    setUsersLoading(true);

    const result = await Promise.all([
      fetchAllUsers(),
      // delay(10000)
    ]);
    // console.log(result);
  } finally {
    setUsersLoading(false);
  }
};

  return (
    <div className="auth_page">
      <div className="auth_card">
        <h1 className="d-flex gap-2 align-items-center">Welcome Back 👋</h1>
        <p className="auth_subtitle">Login to continue shopping</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="auth_form_group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter username"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-danger small mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="auth_form_group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-danger small mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="app_btn app_btn_primary w-100 justify-content-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          {/* {(loading || isSubmitting) && <Loader />} */}

        </form>

        {error && <ErrorMessage message={error} />}
        <div className="auth_demo_box">
          <p><strong>Demo Username:</strong> emilys</p>
          <p><strong>Demo Password:</strong> emilyspass</p>
        </div>

        <button className="app_btn app_btn_primary w-100 justify-content-center" type="button"
          onClick={handleFetchAllUsers} disabled={usersLoading}>
            {usersLoading ? "Fetching users..." : "Fetch all users"}</button>

        {usersLoading && <Loader />}
        {!usersLoading && allUsers && allUsers.map((user) => 
            <div key={user.id}>
              <p style={{margin: '0'}}>{user.id}</p>
              <p style={{margin: '0'}}>{user.username}</p> 
              <p style={{margin: '0'}}>{user.password}</p>
              <p style={{margin: '0 0 1rem 0'}}>{user.role}</p>
          </div>
        )}

      </div>
    </div>
  );
}
export default Login;