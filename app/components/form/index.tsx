
"use client";

import { inputs } from '@/constants'
import React, { FormEvent } from 'react'
import Input from './Input'
import { createProduct, editProduct } from '@/utils/api';
import { Product } from '@/types';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import Link from 'next/link';

type Props = {
    editItem: Product | undefined;
}

const Form = ({ editItem }: Props) => {

    const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const productData = Object.fromEntries(formData.entries());


        if (!editItem) {
            const id = Math.round(Math.random() * 100);
            productData.image_url = `https://picsum.photos/seed/${id}/500/500`;


            // @ts-ignore
            productData.rating = 0;
            // @ts-ignore
            productData.reviews_count = 0;

            createProduct(productData as unknown as Product)
                .then(() => {
                    router.push("/products");
                    router.refresh();
                    toast.info("Ürün başarıyla düzenlendi");
                }
                );

        }

        else {
            let updatedItem = { ...editItem, ...productData };
            editProduct(updatedItem)
                .then(() => {
                    router.push("/products");
                    router.refresh();
                    toast.info("Ürün başarıyla düzenlendi");
                });
        }





    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 mt-5'>
            {inputs.map((i) => (
                //  @ts-ignore
                <Input item={i} value={editItem ? editItem[i.name] : ""} />

            ))}

            <div className='flex justify-end gap-8'>
                <Link href="." type="button" className='bg-gray-300 py1 px-4 rounded-lg
                 hover:bg-gray-400'>Geri</Link>
                <button type="submit" className='bg-green-300 py1 px-4 rounded-lg
                 hover:bg-green-400'>{editItem ? "kaydet" : "duzenle"}</button>
            </div>

        </form>
    )
}

export default Form
