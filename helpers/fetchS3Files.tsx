import useSWR from "swr";
import { Image } from "@mantine/core";

const fetcher = (path: string) => fetch(path).then((res) => res.json());

export const Images = () => {
    const { data } = useSWR<{ Key?: string }[]>("/api/tracks", fetcher);
    return data?.map((image) => <S3Image Key={image.Key!} />);
};

export const S3Image = ({ Key }: { Key: string }) => {
    const { data } = useSWR<{ src: string }>(`/api/tracks/${Key}`, fetcher);
    return <Image alt={data!.src} src={data!.src} />;
};
