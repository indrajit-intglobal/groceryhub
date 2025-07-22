import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile, updateFullProfile, clearProfileState } from "@/utils/slices/ProfileSlice";
import { logoutUser } from "@/service/ProfileService";
import { uploadProfileImage } from "@/service/ProfileService";
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Settings,
  Heart,
  Bell,
  LogOut,
  Edit3,
  Plus,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AppState = {
  auth: {
    user: { id: string } | null;
  };
  profile: {
    loading: boolean;
    profile: any;
    error: string | null;
    updateSuccess: boolean;
  };
};

const Profile = () => {
  const dispatch = useDispatch();
  const user_id = useSelector((state: AppState) => state.auth.user?.id);
  const profileState = useSelector((state: AppState) => state.profile);
  const updateSuccess = profileState.updateSuccess;
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    avatar_url: "",
  });

  
  useEffect(() => {
    if (user_id) {
      dispatch(fetchProfile(user_id));
    }
  }, [dispatch, user_id]);

  // Update local state when profile in Redux changes
  useEffect(() => {
    if (profileState.profile) {
      setProfile({
        id: profileState.profile.id || "",
        first_name: profileState.profile.first_name || "",
        last_name: profileState.profile.last_name || "",
        email: profileState.profile.email || "",
        phone: profileState.profile.phone || "",
        date_of_birth: profileState.profile.date_of_birth || "",
        avatar_url: profileState.profile.avatar_url || "",
      });
    }
  }, [profileState.profile]);

  // Handle Save
  const handleSave = (e) => {
    e.preventDefault();
    if (user_id) {
      const cleanProfile = {
        ...profile,
        date_of_birth: profile.date_of_birth === "" ? null : profile.date_of_birth,
      };
      console.log('Updating profile with:', cleanProfile);
      dispatch(updateFullProfile({ user_id, data: cleanProfile }));
    }
  };

  useEffect(() => {
    if (updateSuccess) {
      console.log('Profile updated successfully:', profileState.profile);
    }
    if (profileState.error) {
      console.error('Profile update error:', profileState.error);
    }
  }, [updateSuccess, profileState.profile, profileState.error]);

  // Handle Logout
  const handleLogout = async () => {
    await logoutUser();
    window.location.reload();
  };

  // Show loading or success
  const loading = profileState.loading;

  const orderHistory = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 45.99,
      items: 5,
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "Processing",
      total: 23.5,
      items: 3,
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      status: "Delivered",
      total: 78.25,
      items: 8,
    },
  ];

  const savedAddresses = [
    {
      id: 1,
      type: "Home",
      address: "123 Main St, City, State 12345",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      address: "456 Office Ave, City, State 12345",
      isDefault: false,
    },
  ];

  const savedCards = [
    {
      id: 1,
      type: "Visa",
      last4: "1234",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "5678",
      expiry: "08/26",
      isDefault: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile.avatar_url} />
                    <AvatarFallback>{profile.first_name?.[0]}{profile.last_name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {profile.first_name} {profile.last_name}
                    </h1>
                    <p className="text-gray-600">{profile.email}</p>
                    <Badge className="mt-2 bg-green-100 text-green-800">
                      Premium Member
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                    onClick={() => setEditMode((v) => !v)}
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    {editMode ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              <TabsTrigger
                value="profile"
                className="flex items-center space-x-1 lg:space-x-2"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="flex items-center space-x-1 lg:space-x-2"
              >
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Orders</span>
              </TabsTrigger>
              <TabsTrigger
                value="addresses"
                className="flex items-center space-x-1 lg:space-x-2"
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline lg:inline">Addresses</span>
              </TabsTrigger>
              <TabsTrigger
                value="cards"
                className="flex items-center space-x-1 lg:space-x-2"
              >
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Cards</span>
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="flex items-center space-x-1 lg:space-x-2"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="first_name">First Name</Label>
                        <Input
                          id="first_name"
                          value={profile.first_name}
                          disabled={!editMode}
                          onChange={(e) => setProfile((p) => ({ ...p, first_name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input
                          id="last_name"
                          value={profile.last_name}
                          disabled={!editMode}
                          onChange={(e) => setProfile((p) => ({ ...p, last_name: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        disabled={true}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profile.phone}
                        disabled={!editMode}
                        onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="date_of_birth">Date of Birth</Label>
                      <Input
                        id="date_of_birth"
                        type="date"
                        value={profile.date_of_birth}
                        disabled={!editMode}
                        onChange={(e) => setProfile((p) => ({ ...p, date_of_birth: e.target.value }))}
                      />
                    </div>
                    {editMode && (
                      <div>
                        <Label htmlFor="avatar_upload">Upload Profile Image</Label>
                        <Input
                          id="avatar_upload"
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file && user_id) {
                              const url = await uploadProfileImage(file, user_id);
                              setProfile((p) => ({ ...p, avatar_url: url }));
                            }
                          }}
                        />
                      </div>
                    )}
                    {editMode && (
                      <Button className="bg-gradient-primary hover:bg-primary/90" type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    )}
                    {updateSuccess && (
                      <div className="text-green-600">Profile updated successfully!</div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderHistory.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Package className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{order.id}</h4>
                            <p className="text-sm text-gray-600">
                              {order.date} • {order.items} items
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${order.total}</div>
                          <Badge
                            className={`mt-1 ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Processing"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Saved Addresses</CardTitle>
                  <Button
                    size="sm"
                    className="bg-gradient-primary hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Address
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {savedAddresses.map((address) => (
                      <div
                        key={address.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <MapPin className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{address.type}</h4>
                            <p className="text-sm text-gray-600">
                              {address.address}
                            </p>
                            {address.isDefault && (
                              <Badge className="mt-1 bg-green-100 text-green-800">
                                Default
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Cards Tab */}
            <TabsContent value="cards" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Payment Methods</CardTitle>
                  <Button
                    size="sm"
                    className="bg-gradient-primary hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Card
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {savedCards.map((card) => (
                      <div
                        key={card.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">
                              {card.type} ending in {card.last4}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Expires {card.expiry}
                            </p>
                            {card.isDefault && (
                              <Badge className="mt-1 bg-green-100 text-green-800">
                                Default
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Bell className="h-6 w-6 text-primary" />
                      <div>
                        <h4 className="font-semibold">Notifications</h4>
                        <p className="text-sm text-gray-600">
                          Manage your notification preferences
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Heart className="h-6 w-6 text-primary" />
                      <div>
                        <h4 className="font-semibold">Wishlist</h4>
                        <p className="text-sm text-gray-600">
                          View and manage your saved items
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <LogOut className="h-6 w-6 text-red-500" />
                      <div>
                        <h4 className="font-semibold">Sign Out</h4>
                        <p className="text-sm text-gray-600">
                          Sign out of your account
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
