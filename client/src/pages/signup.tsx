import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Plus, X } from "lucide-react";
import useSignupLogic from "@/hooks/useSignupLogic";

const SignupPage = () => {
  const {
    showPassword,
    setShowPassword,
    isLoading,
    addShopField,
    signupData,
    navigate,
    removeShopField,
    updateShop,
    handleSubmit,
    handleChange,
  } = useSignupLogic();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Account
          </CardTitle>
          <CardDescription>
            Join our platform and create your shops
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={signupData.username}
                onChange={({ target }) =>
                  handleChange(target.name, target.value)
                }
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={signupData.password}
                  onChange={({ target }) =>
                    handleChange(target.name, target.value)
                  }
                  required
                  className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-sm text-gray-600">
                At least 8 characters, one number, and one special character
              </p>
            </div>

            <div className="space-y-2">
              <Label>Shop Names (minimum 3)</Label>
              {signupData.shops.map((shop, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="text"
                    value={shop}
                    onChange={(e) => updateShop(index, e.target.value)}
                    placeholder={`Shop ${index + 1}`}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                  {signupData.shops.length > 3 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeShopField(index)}
                      className="shrink-0"
                    >
                      <X size={16} />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addShopField}
                className="w-full"
              >
                <Plus size={16} className="mr-2" />
                Add Another Shop
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signin")}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
