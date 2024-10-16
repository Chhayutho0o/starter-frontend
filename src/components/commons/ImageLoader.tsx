import React from "react";
import Image from "next/image";
import placeholder from "@/assets/images/no-image.png";

const ImageLoader = (props: any) => {
  const src = props?.src || placeholder?.src;

  return (
    <Image
      {...props}
      src={src}
      placeholder="blur"
      alt=""
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCABjAGMDASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAGBABAQEBAQAAAAAAAAAAAAAAAAERAhL/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD3zh4MUOKhSKkA4uFIqQAYw8RU1NXU2KjOpq7E2AQPABYch4cghSKkORUgCRUgkVIKWDFYARU2NLE2AzsTY0sLARgVgAjhHBlUVExUFVDKGBgEBUqdKgmkdJFAABnpysvRzoZbSqlYzpc6FaynrOU9BejUaNBWptTaVoK0tTo0VWhGgHL6VOnN7VOxHVOlTpz89LnQOidH6Yzo/QNfQ9MvQ9Au9Femd6L0K09D0y9D0g09Bn6APPnS5055V81B089NJ05ua15qjedK9MZVaDT0XpGjQVei9ItLQX6L0jRoq/QRoBwRfICDTlryADSKgCgIACpUBAiAAAAH/9k="
      loading="lazy"
    />
  );
};

export default ImageLoader;
