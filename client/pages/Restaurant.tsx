import React, { useState } from 'react';
import { ArrowLeft, Search, Bookmark, Star, Clock, Bike, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useLocation } from 'react-router-dom';

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description?: string;
  image: string;
  weight?: string;
}

const Restaurant = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('POPULAR');

  // Get restaurant data from location state or use default
  const restaurantData = location.state?.restaurant;
  
  // Sample restaurant data - in a real app, this would come from props or API
  const restaurant = restaurantData || {
    id: 'default',
    name: 'KUNFU PANDA',
    rating: 4.1,
    reviewCount: 132,
    deliveryTime: '55-65 min',
    discount: '10%',
    minOrder: '100 K',
    deliveryFee: 'K 1',
    deliveryTimeRange: '55-65 min',
    cuisine: 'Chinese'
  };

  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Bubble tea 珍珠奶茶',
      price: '50K',
      image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      description: '500 ml'
    },
    {
      id: '2',
      name: 'Fried rice with chicken 鸡肉炒饭',
      price: '150K',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      description: '550 g'
    },
    {
      id: '3',
      name: 'Steamed Dumplings',
      price: '80K',
      image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      description: '6 pieces'
    },
    {
      id: '4',
      name: 'Noodles with Vegetables',
      price: '120K',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      description: '400 g'
    },
    {
      id: '5',
      name: 'Sweet and Sour Pork',
      price: '180K',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      description: '400 g'
    },
    {
      id: '6',
      name: 'Kung Pao Chicken',
      price: '160K',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      description: '450 g'
    },
    {
      id: '7',
      name: 'Hot Pot Soup',
      price: '200K',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      description: 'Serves 2-3'
    },
    {
      id: '8',
      name: 'Green Tea Ice Cream',
      price: '45K',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      description: '2 scoops'
    }
  ];

  const tabs = ['POPULAR', 'LUNCH', 'NOODLES', 'RICE NOODLES', 'RICE', 'DRINKS'];

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGoBack}
            className="p-2"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-3">
            <Search className="h-6 w-6 text-gray-600" />
            <Bookmark className="h-6 w-6 text-gray-600" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Restaurant Hero Section */}
        <div className="bg-white">
          <div className="px-4 lg:px-8 py-6 lg:py-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
              {/* Restaurant Image */}
              <div className="lg:w-1/3 mb-6 lg:mb-0">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt={restaurant.name}
                  className="w-full h-48 lg:h-64 object-cover rounded-lg shadow-md"
                />
              </div>
              
              {/* Restaurant Info */}
              <div className="lg:w-2/3">
                <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3">{restaurant.name}</h1>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{restaurant.rating}</span>
            <span className="text-gray-500 text-sm">({restaurant.reviewCount} ratings)</span>
          </div>
          
          <div className="flex items-center gap-1 text-gray-600">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{restaurant.deliveryTime}</span>
            <span className="text-sm">Delivery</span>
          </div>
        </div>

                {/* Discount Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <Badge className="bg-red-500 text-white px-4 py-2 text-sm font-semibold w-fit">
                    -{restaurant.discount} For orders from {restaurant.minOrder}
                  </Badge>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">from K100</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      TIMER <Clock className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b sticky top-16 z-40">
          <div className="px-4 lg:px-8">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="bg-white">
          <div className="px-4 lg:px-8 py-6">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
               {menuItems.map((item) => (
                 <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                   <div className="relative">
                     <img
                       src={item.image}
                       alt={item.name}
                       className="w-full h-32 lg:h-40 object-cover"
                       onError={(e) => {
                         const target = e.target as HTMLImageElement;
                         target.src = "/placeholder.svg";
                       }}
                     />
                     <Button
                       size="sm"
                       className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-white text-gray-600 hover:bg-gray-50 p-0 shadow-md"
                     >
                       <Plus className="h-4 w-4" />
                     </Button>
                   </div>
                   <div className="p-3 lg:p-4">
                     <div className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">{item.price}</div>
                     <div className="text-sm text-gray-700 mb-1 line-clamp-2">{item.name}</div>
                     {item.description && (
                       <div className="text-xs text-gray-500">{item.description}</div>
                     )}
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </div>

         {/* Bottom Delivery Info */}
         <div className="sticky bottom-0 bg-white border-t shadow-lg">
           <div className="px-4 lg:px-8 py-4">
             <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                 <Bike className="h-5 w-5 text-gray-600" />
                 <span className="text-sm font-medium">Delivery {restaurant.deliveryFee} • {restaurant.deliveryTimeRange}</span>
               </div>
               <Button
                 variant="ghost"
                 size="sm"
                 className="text-orange-500 hover:text-orange-600"
               >
                 Detailed conditions →
               </Button>
             </div>
           </div>
         </div>
       </div>
     </div>
  );
};

export default Restaurant;