import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify'

//redux
import { authDataSelector } from "@/redux/auth/selectors"
import { UserData } from "@/redux/auth/types"
import { ProductItem } from "@/redux/products/types"

//API
import { getProduct } from "@/API/dressesService"
import { addToWishList, removeFromWishList } from "@/API/userService"



type UseWishListResult = {
    isFavorite: boolean,
    toggleFavorite: () => void
}


const useWishList = (itemId: string, isAuth: boolean): UseWishListResult => {
    const data = useSelector(authDataSelector);
    const [isFavorite, setIsFavorite] = useState(false);
    const [product, setProduct] = useState<ProductItem>();

    useEffect(() => {
        const getProductItem = async () => {
            const product = await getProduct(itemId);
            setProduct(product);
        };
        getProductItem();
    }, [itemId]);

    useEffect(() => {
        const checkIsFavorite = async () => {
            if (data && product) {
                setIsFavorite(
                    data.wishList ? data.wishList.some((item) => item._id === product._id) : false
                );
            }
        };

        if (product) {
            checkIsFavorite();
        }
    }, [data, product])

    const updateWishList = async (user: UserData, product: ProductItem) => {
        try {
            if (isFavorite) {
                await removeFromWishList(user._id, product._id);
            } else {
                await addToWishList(user._id, product._id);
            }

        } catch (err) {
            console.error(err);
            toast.error('Failed to update wishlist');
        }
    }

    const toggleFavorite = () => {
        if (!data) {
            toast.error('Failed to receive user data');
            return;
        }

        if (!isAuth) {
            toast.error('Please login!');
            return;
        }

        setIsFavorite(!isFavorite);

        product && updateWishList(data, product);
    };

    return { isFavorite, toggleFavorite };
}

export default useWishList;